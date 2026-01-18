import { Card, CardContent } from "@/components/ui/card";
import { Bell, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { PageContainer } from "@/components/ui/motion";
import { AnnouncementForm } from "@/components/announcements/announcement-form";
import { DeleteAnnouncementButton } from "@/components/announcements/delete-announcement-button";

interface Announcement {
  id: number;
  title: string;
  content: string;
  priority: string;
  createdAt: Date;
  expiresAt: Date | null;
  createdBy: string;
}

export default async function AnnouncementsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const isAdmin = user.role === "admin";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const announcements: Announcement[] = await (db as any).announcement.findMany(
    {
      where: {
        OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }],
      },
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
    },
  );

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "important":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-4 border-l-red-500 bg-red-50";
      case "important":
        return "border-l-4 border-l-amber-500 bg-amber-50";
      default:
        return "border-l-4 border-l-blue-500";
    }
  };

  return (
    <PageContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Announcements</h2>
        </div>
      </div>

      {/* Admin: Create Announcement Form */}
      {isAdmin && <AnnouncementForm />}

      {/* Announcements List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {isAdmin ? "All Announcements" : "Latest Updates"}
        </h3>
        {announcements.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No announcements at this time.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {announcements.map((announcement: Announcement) => (
              <Card
                key={announcement.id}
                className={getPriorityStyles(announcement.priority)}
              >
                <CardContent className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      {getPriorityIcon(announcement.priority)}
                      <div>
                        <h4 className="font-semibold">{announcement.title}</h4>
                        <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
                          {announcement.content}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Posted {announcement.createdAt.toLocaleDateString()}{" "}
                          by {announcement.createdBy}
                          {announcement.expiresAt && (
                            <>
                              {" "}
                              • Expires{" "}
                              {announcement.expiresAt.toLocaleDateString()}
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    {isAdmin && (
                      <DeleteAnnouncementButton id={announcement.id} />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
