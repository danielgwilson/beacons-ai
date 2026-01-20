import { CreatorPage } from "@/components/creator/creator-page";

export default function DemoPage() {
  return (
    <CreatorPage
      showPreviewBadge
      profile={{
        id: "demo",
        handle: "demo",
        displayName: "Demo Creator",
        bio: "Links, embeds, and lead capture — all in one page.",
        avatarUrl: "https://placehold.co/256x256/png",
        theme: {
          background: "#0b1020",
          cardBackground: "rgba(255,255,255,0.06)",
          text: "#ffffff",
          mutedText: "rgba(255,255,255,0.75)",
          buttonBackground: "#7c3aed",
          buttonText: "#ffffff",
          accent: "#22c55e",
        },
      }}
      blocks={[
        {
          id: "b1",
          type: "link",
          enabled: true,
          data: {
            title: "Watch my latest video",
            url: "https://youtube.com",
            subtitle: "New upload",
          },
        },
        {
          id: "b2",
          type: "social",
          enabled: true,
          data: {
            links: [
              { platform: "instagram", url: "https://instagram.com" },
              { platform: "x", url: "https://x.com" },
              { platform: "youtube", url: "https://youtube.com" },
            ],
          },
        },
        {
          id: "b3",
          type: "text",
          enabled: true,
          data: {
            title: "About",
            markdown:
              "I make videos about building products.\nSubscribe for weekly drops.",
          },
        },
        {
          id: "b4",
          type: "signup",
          enabled: true,
          data: {
            title: "Join my newsletter",
            description: "Get my best links + behind-the-scenes each week.",
          },
        },
        {
          id: "b5",
          type: "support",
          enabled: true,
          data: { title: "Tip jar", url: "https://ko-fi.com" },
        },
      ]}
    />
  );
}
