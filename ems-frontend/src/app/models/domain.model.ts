export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  dateOfBirth?: string;
  gender?: string;
  phone?: string;
  nationalId?: string;
  address?: string;
  department?: string;
  qualification?: string;
  profileImageUrl?: string;
  createdAt: string;
  baseSalary?: number;
}

export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  dateOfBirth?: string;
  gender?: string;
  phone?: string;
  nationalId?: string;
  address?: string;
  department: string;
  qualification?: string;
  salary: number;
}

export interface Leave {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  reason?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  daysCount: number;
  createdAt: string;
  employee?: Employee;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  dueDate?: string;
  status: 'ASSIGNED' | 'IN_PROGRESS' | 'SUBMITTED' | 'GRADED';
  assignedToId?: string;
  score?: number;
  submittedAt?: string;
  createdAt: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY';
  hoursWorked?: number;
  notes?: string;
}

export type AnnouncementPriority = 'NORMAL' | 'IMPORTANT' | 'URGENT';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: AnnouncementPriority;
  expiresAt?: string;
  createdAt: string;
}

export interface CreateAnnouncementRequest {
  title: string;
  content: string;
  priority: AnnouncementPriority;
  expiresAt?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'LEAVE' | 'PROJECT' | 'HOLIDAY';
  start: string;
  end: string;
  color?: string;
  description?: string;
}

export interface Salary {
  id: string;
  employeeId: string;
  employeeName: string;
  baseSalary: number;
  bonuses: number;
  deductions: number;
  totalSalary: number;
  paymentDate: string;
  monthYear: string;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
}

export interface CreateSalaryRequest {
  employeeId: string;
  baseSalary: number;
  bonuses: number;
  deductions: number;
  paymentDate: string;
}

export interface DashboardStats {
  totalEmployees?: number;
  activeDepartments?: number;
  pendingLeaves?: number;
  activeProjects?: number;
  myPendingLeaves?: number;
  myActiveProjects?: number;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  rating: number;
  feedback: string;
  reviewDate: string;
  createdAt: string;
  employee?: Employee;
}

export interface CreatePerformanceReviewRequest {
  employeeId: string;
  rating: number;
  feedback: string;
}
