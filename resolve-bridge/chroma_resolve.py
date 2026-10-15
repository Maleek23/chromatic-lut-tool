#!/usr/bin/env python3
"""
Chroma <-> DaVinci Resolve bridge.

Talks to a RUNNING DaVinci Resolve through its local scripting API and lets
Chroma inspect timelines/clips, install LUTs, apply them to clip nodes, apply
DRX grades, and grab stills back for comparison.

Requirements (one-time, in Resolve):
  Preferences > System > General > "External scripting using" must allow
  LOCAL scripting. Without it, every command fails fast with instructions.

Usage:
  python3 chroma_resolve.py status
  python3 chroma_resolve.py projects
  python3 chroma_resolve.py timelines
  python3 chroma_resolve.py clips [--track 1]
  python3 chroma_resolve.py nodes [--track 1 --clip 1]
  python3 chroma_resolve.py install-lut /path/to/grade.cube [--subfolder Chroma]
  python3 chroma_resolve.py set-lut grade.cube [--node 1 --track 1 --clip 1 | --all]
  python3 chroma_resolve.py apply-drx /path/to/grade.drx [--grade-mode 0]
  python3 chroma_resolve.py grab-still --out /tmp --prefix chroma [--format dpx]

All commands print JSON to stdout and exit non-zero with {"ok": False,
"error": ...} on failure, so the Chroma server (or any caller) can drive them.
"""

import argparse
import json
import os
import shutil
import sys

SCRIPTING_MODULES = (
    "/Library/Application Support/Blackmagic Design/"
    "DaVinci Resolve/Developer/Scripting/Modules"
)
RESOLVE_LUT_DIR = os.path.expanduser(
    "~/Library/Application Support/Blackmagic Design/"
    "DaVinci Resolve/LUT"
)


class ResolveBridgeError(Exception):
    """Expected failure with a user-actionable message."""


def connect():
    """Return the Resolve object or raise with setup instructions."""
    sys.path.append(SCRIPTING_MODULES)
    try:
        import DaVinciResolveScript as dvr_script  # type: ignore
    except ImportError as exc:
        raise ResolveBridgeError(
            "Scripting modules not found at %s. "
            "Is DaVinci Resolve installed? (%s)" % (SCRIPTING_MODULES, exc)
        )
    resolve = dvr_script.scriptapp("Resolve")
    if resolve is None:
        raise ResolveBridgeError(
            "No response from DaVinci Resolve. Check: (1) Resolve is open, "
            "(2) Preferences > System > General > 'External scripting using' "
            "allows LOCAL scripting, (3) same macOS user."
        )
    return resolve


def get_project(resolve, name=None):
    pm = resolve.GetProjectManager()
    project = pm.GetCurrentProject()
    if name:
        project = pm.LoadProject(name)
    if project is None:
        raise ResolveBridgeError(
            "No project open. Open a project in Resolve first"
            + (" (tried '%s')" % name if name else "")
            + "."
        )
    return project


def get_timeline(project):
    timeline = project.GetCurrentTimeline()
    if timeline is None:
        raise ResolveBridgeError(
            "No timeline open. Open a timeline in the Edit/Color page first."
        )
    return timeline


def cmd_status(resolve, _args):
    project = resolve.GetProjectManager().GetCurrentProject()
    timeline = project.GetCurrentTimeline() if project else None
    return {
        "resolve": True,
        "project": project.GetName() if project else None,
        "timeline": timeline.GetName() if timeline else None,
        "timeline_count": project.GetTimelineCount() if project else 0,
    }


def cmd_projects(resolve, _args):
    pm = resolve.GetProjectManager()
    return {"projects": pm.GetProjectListInCurrentFolder() or []}


def cmd_timelines(resolve, args):
    project = get_project(resolve, args.project)
    return {
        "project": project.GetName(),
        "timelines": [
            project.GetTimelineByIndex(i + 1).GetName()
            for i in range(int(project.GetTimelineCount()))
        ],
    }


def iter_clips(timeline, track=1):
    clips = timeline.GetItemListInTrack("video", int(track)) or []
    return clips


def cmd_clips(resolve, args):
    project = get_project(resolve, args.project)
    timeline = get_timeline(project)
    clips = iter_clips(timeline, args.track)
    return {
        "timeline": timeline.GetName(),
        "track": int(args.track),
        "clips": [
            {"index": i + 1, "name": c.GetName()} for i, c in enumerate(clips)
        ],
    }


def describe_graph(item):
    graph = item.GetNodeGraph()
    nodes = []
    for idx in range(1, int(graph.GetNumNodes()) + 1):
        try:
            lut = graph.GetLUT(idx)
        except Exception:
            lut = None
        try:
            tools = graph.GetToolsInNode(idx)
        except Exception:
            tools = []
        nodes.append({"index": idx, "lut": lut, "tools": tools or []})
    return nodes


def pick_clip(timeline, track, clip):
    clips = iter_clips(timeline, track)
    if not clips:
        raise ResolveBridgeError("No clips on video track %s." % track)
    idx = int(clip) - 1
    if idx < 0 or idx >= len(clips):
        raise ResolveBridgeError(
            "Clip %s out of range (track %s has %d clips)."
            % (clip, track, len(clips))
        )
    return clips[idx]


def cmd_nodes(resolve, args):
    project = get_project(resolve, args.project)
    timeline = get_timeline(project)
    item = pick_clip(timeline, args.track, args.clip)
    return {
        "clip": item.GetName(),
        "node_count": len(describe_graph(item)),
        "nodes": describe_graph(item),
    }


def cmd_install_lut(resolve, args):
    src = os.path.abspath(args.lut)
    if not os.path.isfile(src):
        raise ResolveBridgeError("LUT file not found: %s" % args.lut)
    dest_dir = os.path.join(RESOLVE_LUT_DIR, args.subfolder) if args.subfolder else RESOLVE_LUT_DIR
    os.makedirs(dest_dir, exist_ok=True)
    dest = os.path.join(dest_dir, os.path.basename(src))
    shutil.copyfile(src, dest)

    project = get_project(resolve, args.project)
    refreshed = bool(project.RefreshLUTList())
    rel = os.path.relpath(dest, RESOLVE_LUT_DIR)
    return {"installed": dest, "lut_name": rel, "lut_list_refreshed": refreshed}


def cmd_set_lut(resolve, args):
    project = get_project(resolve, args.project)
    timeline = get_timeline(project)
    applied = []
    if args.all:
        for track in range(1, int(timeline.GetTrackCount("video")) + 1):
            for i, item in enumerate(iter_clips(timeline, track)):
                graph = item.GetNodeGraph()
                if graph.GetNumNodes() < int(args.node):
                    continue
                ok = bool(graph.SetLUT(int(args.node), args.lut))
                applied.append(
                    {"track": track, "clip": i + 1, "node": int(args.node), "ok": ok}
                )
    else:
        item = pick_clip(timeline, args.track, args.clip)
        graph = item.GetNodeGraph()
        if graph.GetNumNodes() < int(args.node):
            raise ResolveBridgeError(
                "Clip has %d node(s); node %s does not exist."
                % (graph.GetNumNodes(), args.node)
            )
        ok = bool(graph.SetLUT(int(args.node), args.lut))
        applied.append(
            {"track": int(args.track), "clip": int(args.clip), "node": int(args.node), "ok": ok}
        )
    return {"lut": args.lut, "applied": applied}


def cmd_apply_drx(resolve, args):
    path = os.path.abspath(args.drx)
    if not os.path.isfile(path):
        raise ResolveBridgeError("DRX file not found: %s" % args.drx)
    project = get_project(resolve, args.project)
    timeline = get_timeline(project)
    applied = []
    for track in range(1, int(timeline.GetTrackCount("video")) + 1):
        clips = iter_clips(timeline, track)
        if not clips:
            continue
        ok = bool(timeline.ApplyGradeFromDRX(path, int(args.grade_mode), clips))
        applied.append({"track": track, "clips": len(clips), "ok": ok})
    return {"drx": path, "applied": applied}


def cmd_grab_still(resolve, args):
    project = get_project(resolve, args.project)
    timeline = get_timeline(project)
    still = timeline.GrabStill()
    if still is None:
        raise ResolveBridgeError("GrabStill failed. Is a clip under the playhead?")
    gallery = project.GetGallery()
    out_dir = os.path.abspath(args.out)
    os.makedirs(out_dir, exist_ok=True)
    ok = bool(gallery.ExportStills([still], out_dir, args.prefix, args.format))
    return {"exported": ok, "dir": out_dir, "prefix": args.prefix, "format": args.format}


def build_parser():
    p = argparse.ArgumentParser(description="Chroma <-> DaVinci Resolve bridge")
    sub = p.add_subparsers(dest="command", required=True)

    def add_common(sp):
        sp.add_argument("--project", default=None, help="Project name (default: current)")

    for name in ("status", "projects"):
        s = sub.add_parser(name)
        add_common(s)

    s = sub.add_parser("timelines")
    add_common(s)

    s = sub.add_parser("clips")
    add_common(s)
    s.add_argument("--track", default="1")

    s = sub.add_parser("nodes")
    add_common(s)
    s.add_argument("--track", default="1")
    s.add_argument("--clip", default="1")

    s = sub.add_parser("set-lut")
    add_common(s)
    s.add_argument("lut", help="LUT name as shown in Resolve, or absolute path")
    s.add_argument("--node", default="1", help="Node index (default 1)")
    s.add_argument("--track", default="1")
    s.add_argument("--clip", default="1")
    s.add_argument("--all", action="store_true", help="Apply to every clip")

    s = sub.add_parser("install-lut")
    add_common(s)
    s.add_argument("lut", help="Local .cube/.3dl file to copy into Resolve's LUT folder")
    s.add_argument("--subfolder", default="Chroma")

    s = sub.add_parser("apply-drx")
    add_common(s)
    s.add_argument("drx", help="Still/drx file whose grade (incl. node tree) to apply")
    s.add_argument("--grade-mode", default="0")

    s = sub.add_parser("grab-still")
    add_common(s)
    s.add_argument("--out", required=True)
    s.add_argument("--prefix", default="chroma")
    s.add_argument("--format", default="dpx")
    return p


def main(argv=None):
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        resolve = connect()
    except ResolveBridgeError as exc:
        print(json.dumps({"ok": False, "error": str(exc)}))
        return 2
    try:
        handlers = {
            "status": cmd_status,
            "projects": cmd_projects,
            "timelines": cmd_timelines,
            "clips": cmd_clips,
            "nodes": cmd_nodes,
            "install-lut": cmd_install_lut,
            "set-lut": cmd_set_lut,
            "apply-drx": cmd_apply_drx,
            "grab-still": cmd_grab_still,
        }
        result = handlers[args.command](resolve, args)
        print(json.dumps({"ok": True, "command": args.command, "result": result}, indent=2))
        return 0
    except ResolveBridgeError as exc:
        print(json.dumps({"ok": False, "error": str(exc)}))
        return 3
    except Exception as exc:  # noqa: BLE001 - surface host errors as JSON
        print(json.dumps({"ok": False, "error": "Resolve call failed: %s" % exc}))
        return 4


if __name__ == "__main__":
    sys.exit(main())
