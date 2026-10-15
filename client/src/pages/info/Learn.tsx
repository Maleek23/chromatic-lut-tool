import { Link } from "wouter";
import { PageShell } from "@/components/layout/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  FlaskConical,
  Download,
  FileType2,
  ImagePlus,
  Clapperboard,
  LifeBuoy,
} from "lucide-react";

const TOPICS = [
  {
    href: "/color-science",
    icon: FlaskConical,
    title: "Color Science",
    body: "How Chroma extracts a look: Lab space, k-means clusters, filmic tone curves, skin-tone protection.",
  },
  {
    href: "/resources/install-luts",
    icon: Download,
    title: "Install LUTs",
    body: "Where to put LUTs for Resolve, Premiere, Final Cut, After Effects, Avid and more.",
  },
  {
    href: "/resources/lut-formats",
    icon: FileType2,
    title: "LUT Formats",
    body: ".cube vs .3dl vs .look vs .dctl — what each is for and which editor reads it.",
  },
  {
    href: "/resources/create-from-images",
    icon: ImagePlus,
    title: "Create From Images",
    body: "How to pick a reference image so the generated LUT actually matches your intent.",
  },
  {
    href: "/workflows",
    icon: Clapperboard,
    title: "Editor Workflows",
    body: "Step-by-step recipes for using a Chroma LUT in each editor.",
  },
  {
    href: "/support",
    icon: LifeBuoy,
    title: "Support",
    body: "Stuck? Get help and answers to common questions.",
  },
];

export default function Learn() {
  return (
    <PageShell
      icon={<BookOpen className="w-7 h-7 text-primary" />}
      title="Learn"
      subtitle="Everything about LUTs and color — color science, formats, installs and workflows."
      width="lg"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        {TOPICS.map(({ href, icon: Icon, title, body }) => (
          <Link key={href} href={href}>
            <Card className="h-full bg-background/80 backdrop-blur-sm hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-5 space-y-2">
                <div className="p-2 rounded-lg bg-primary/10 w-fit">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <h2 className="font-semibold">{title}</h2>
                <p className="text-sm text-muted-foreground">{body}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
