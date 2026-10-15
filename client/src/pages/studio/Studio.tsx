import Tool from "@/pages/tools/Tool";

/**
 * Studio renders inside AppShell (sidebar + topbar come from the shell).
 * The creation flow itself is a guided Source → Analyze → Refine →
 * Preview → Export stepper owned by Tool.
 */
export default function Studio() {
  return <Tool embedded />;
}
