import { EmployeeForm } from "@/components/forms/employee-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { PageContainer } from "@/components/ui/motion";
import Image from "next/image";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  // If role is admin, maybe show admin profile or redirect?
  // Use a dummy query for Admin to test, or fetch real admin if exists.
  // For now, let's assume this is typically for Employees.
  // If user.role === 'admin', we might just show a "Admin Profile" placeholder or fetch admin details if we had an Admin model with details.

  let employeeData = null;
  if (user.role === "employee" || user.role === "admin") {
    // Note: Legacy Admin didn't have a full profile, but let's allow Admin to see "Profile" if they have an Employee record linked?
    // Or just fetch by ID if we treat Admin as an Employee too (rare).
    // Let's stick to: If Employee, fetch data.
    if (user.id && user.role === "employee") {
      employeeData = await db.employee.findUnique({
        where: { id: parseInt(user.id) },
        include: { salaryInfo: true },
      });
    } else if (user.role === "admin") {
      // Show a dummy or admin specific view?
      // For now, let's just NOT try to fetch employee data for admin id, avoiding the error.
      // We can optionally create an 'Admin' object or just return a simple "You are Admin" View.
      // But the layout expects employeeData.
      // Better: Return a simple "Admin Profile" block here if no employeeData is found but user is Admin.
      return (
        <PageContainer className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Admin Profile</h2>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Admin Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You are logged in as Administrator.</p>
              <p className="text-muted-foreground mt-2">{user.email}</p>
            </CardContent>
          </Card>
        </PageContainer>
      );
    }
  }

  if (!employeeData && user.role === "employee") {
    return <div>Employee record not found.</div>;
  }

  return (
    <PageContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">My Profile</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="h-32 w-32 rounded-full bg-slate-200 flex items-center justify-center text-4xl text-slate-500 overflow-hidden">
                {employeeData?.pic ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={`/process/${employeeData.pic}`}
                      alt="Profile"
                      fill
                      className="object-cover"
                      unoptimized // Allow local/legacy paths without config
                    />
                  </div>
                ) : (
                  <span>{employeeData?.firstName?.charAt(0)}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  First Name
                </label>
                <div className="text-lg font-semibold">
                  {employeeData?.firstName}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Last Name
                </label>
                <div className="text-lg font-semibold">
                  {employeeData?.lastName}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <div className="text-lg font-semibold">
                  {employeeData?.email}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Contact
                </label>
                <div className="text-lg font-semibold">
                  {employeeData?.contact || "-"}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Gender
                </label>
                <div className="text-lg font-semibold">
                  {employeeData?.gender || "-"}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Birthday
                </label>
                <div className="text-lg font-semibold">
                  {employeeData?.birthday || "-"}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Address
                </label>
                <div className="text-lg font-semibold">
                  {employeeData?.address || "-"}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Department
                </label>
                <div className="text-lg font-semibold">
                  {employeeData?.dept || "-"}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Degree
                </label>
                <div className="text-lg font-semibold">
                  {employeeData?.degree || "-"}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Join Date
                </label>
                <div className="text-lg font-semibold">
                  {employeeData?.createdAt?.toLocaleDateString() || "-"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Salary Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Base Salary
                  </label>
                  <div className="text-lg font-semibold">
                    ₹{employeeData?.salaryInfo?.base.toLocaleString() || 0}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Total Salary
                  </label>
                  <div className="text-lg font-semibold text-green-600">
                    ₹{employeeData?.salaryInfo?.total.toLocaleString() || 0}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Update Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Need to update your contact info or address?
              </p>
              {employeeData && (
                <EmployeeForm
                  initialData={employeeData}
                  isEmployeeView={true}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
