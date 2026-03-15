import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../../../core/services/business.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Project, Employee } from '../../../../models/domain.model';
import { BadgeComponent } from '../../../../shared/ui';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.scss',
})
export class ProjectFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  projectForm: FormGroup;
  isEditMode = signal(false);
  projectId: string | null = null;
  loading = signal(false);
  error = signal('');
  employees = signal<Employee[]>([]);

  constructor() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['ASSIGNED', Validators.required],
      assignedToId: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode.set(true);
      this.projectId = id;
      this.loadProject(id);
    }
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees(0, 100).subscribe({
      next: (res) => this.employees.set(res.content),
      error: (err: any) => console.error('Failed to load employees', err),
    });
  }

  loadProject(id: string): void {
    this.loading.set(true);
    this.projectService.getProjectById(id).subscribe({
      next: (project: Project) => {
        this.projectForm.patchValue({
          name: project.name,
          description: project.description,
          status: project.status,
          assignedToId: project.assignedToId || '',
        });
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error('Failed to load project', err);
        this.error.set('Failed to load project details');
        this.loading.set(false);
      },
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) return;

    this.loading.set(true);
    const formData = this.projectForm.value;

    if (this.isEditMode() && this.projectId) {
      this.projectService.updateProject(this.projectId, formData, formData.assignedToId).subscribe({
        next: () => this.router.navigate(['/projects']),
        error: (err: any) => {
          this.error.set('Failed to update project');
          this.loading.set(false);
        },
      });
    } else {
      this.projectService.createProject(formData, formData.assignedToId).subscribe({
        next: () => this.router.navigate(['/projects']),
        error: (err: any) => {
          this.error.set('Failed to create project');
          this.loading.set(false);
        },
      });
    }
  }
}
