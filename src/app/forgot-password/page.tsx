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
import { Mail } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/30 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/30 blur-[100px]" />
      </div>

      <div className="z-10 w-full max-w-md px-4">
        <Card className="border-slate-200/60 bg-white/70 shadow-2xl backdrop-blur-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">Forgot Password</CardTitle>
            <CardDescription>
              Enter your email to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={async () => {
                "use server";
                // Mock action
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="email"
                    id="email"
                    placeholder="you@example.com"
                    type="email"
                    className="pl-9 bg-white/50"
                    required
                  />
                </div>
              </div>

              <div className="bg-indigo-50 text-indigo-800 text-sm p-3 rounded-md border border-indigo-100">
                <strong>Note:</strong> Since this is a demo, please contact your
                administrator to reset your password manually if you cannot
                login.
              </div>

              <div className="flex flex-col gap-2">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Send Reset Link
                </Button>
                <Link href="/" className="w-full">
                  <Button variant="outline" className="w-full">
                    Back to Login
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
