import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LockKeyhole, User } from "lucide-react";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[100px]" />
      </div>

      <div className="z-10 w-full max-w-md px-4">
        <div className="mb-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            DDO Bharuch
          </h1>
          <p className="mt-2 text-lg text-muted-foreground font-medium">
            Employee Management System
          </p>
        </div>

        <Card className="border-border bg-card/70 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>Please sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="admin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="employee">Employee</TabsTrigger>
              </TabsList>

              <TabsContent value="admin">
                <form
                  action={async (formData) => {
                    "use server";
                    await import("@/lib/actions").then((m) =>
                      m.loginAdmin(null, formData),
                    );
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="email"
                        id="admin-email"
                        placeholder="admin@example.com"
                        type="email"
                        className="pl-9 bg-white/50"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="password"
                        id="admin-password"
                        type="password"
                        className="pl-9 bg-white/50"
                        required
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02]">
                    Log In as Admin
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="employee">
                <form
                  action={async (formData) => {
                    "use server";
                    await import("@/lib/actions").then((m) =>
                      m.loginEmployee(null, formData),
                    );
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="emp-email">Email</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="email"
                        id="emp-email"
                        placeholder="employee@example.com"
                        type="email"
                        className="pl-9 bg-white/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emp-password">Password</Label>
                      <a
                        href="/forgot-password"
                        className="text-xs text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="password"
                        id="emp-password"
                        type="password"
                        className="pl-9 bg-white/50"
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02]">
                    Log In as Employee
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground font-medium">
          &copy; 2026 District Panchayat - Bharuch
        </div>
      </div>
    </main>
  );
}
