import { ImageResponse } from "next/og";

import { featuredProjects, getProject, profile } from "@/content/site";

export const alt = `Project by ${profile.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return featuredProjects.map(({ slug }) => ({ slug }));
}

/** Share image for a project page: project name, summary and type. */
export default async function ProjectImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const ink = "#111111";
  const muted = "#6b6b6f";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#ffffff",
        color: ink,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: muted }}>
        <span style={{ color: ink, fontWeight: 600, fontSize: 28 }}>{profile.name}</span>
        <span>{project ? `${project.category}, ${project.year}` : "Project"}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 150, fontWeight: 600, lineHeight: 0.9, letterSpacing: -7 }}>
          {project?.title ?? "Project"}
        </span>
        <span style={{ marginTop: 28, fontSize: 40, color: muted, letterSpacing: -1 }}>{project?.summary ?? ""}</span>
      </div>
    </div>,
    size,
  );
}
