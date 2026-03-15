package com.ems.modules.project.controller;

import com.ems.common.dto.BaseResponse;
import com.ems.modules.project.service.ProjectService;
import com.ems.modules.project.dto.request.CreateProjectRequest;
import com.ems.modules.project.dto.response.ProjectResponse;

import com.ems.entity.Project;
import com.ems.common.security.UserPrincipal;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import com.ems.modules.project.mapper.ProjectMapper;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Tag(name = "Projects", description = "Project management endpoints")
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectMapper projectMapper;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create project", description = "Create a new project and optionally assign it")
    public ResponseEntity<BaseResponse<Project>> createProject(@Valid @RequestBody CreateProjectRequest request) {
        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .build();

        Project savedProject = projectService.createProject(project, request.getAssignedToId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(BaseResponse.success(savedProject, "Project created successfully"));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all projects", description = "Get all projects (Admin only)")
    public ResponseEntity<BaseResponse<Page<Project>>> getAllProjects(
            @PageableDefault(size = 10, sort = "createdAt") Pageable pageable) {
        Page<Project> response = projectService.getAllProjects(pageable);
        return ResponseEntity.ok(BaseResponse.success(response));
    }

    @GetMapping("/my")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @Operation(summary = "Get my projects", description = "Get projects assigned to current user")
    public ResponseEntity<BaseResponse<Page<Project>>> getMyProjects(
            @AuthenticationPrincipal UserPrincipal userDetails,
            @PageableDefault(size = 10, sort = "createdAt") Pageable pageable) {
        Page<Project> response = projectService.getMyProjects(userDetails.getId(), pageable);
        return ResponseEntity.ok(BaseResponse.success(response));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.canAccessProject(#id)")
    @Operation(summary = "Get Project by ID", description = "Get detailed project information")
    public ResponseEntity<BaseResponse<ProjectResponse>> getProjectById(@PathVariable UUID id) {
        Project project = projectService.getProjectById(id);
        return ResponseEntity.ok(BaseResponse.success(projectMapper.toResponse(project)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update Project", description = "Update project details")
    public ResponseEntity<BaseResponse<ProjectResponse>> updateProject(
            @PathVariable UUID id,
            @Valid @RequestBody CreateProjectRequest request) {

        Project projectDetails = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .status(request.getStatus())
                .build();

        Project updatedProject = projectService.updateProject(id, projectDetails, request.getAssignedToId());
        return ResponseEntity.ok(BaseResponse.success(projectMapper.toResponse(updatedProject), "Project updated successfully"));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or @securityService.canAccessProject(#id)")
    @Operation(summary = "Update Project Status", description = "Update the status of a project")
    public ResponseEntity<BaseResponse<Project>> updateProjectStatus(
            @PathVariable UUID id,
            @RequestParam Project.ProjectStatus status) {
        Project response = projectService.updateProjectStatus(id, status);
        return ResponseEntity.ok(BaseResponse.success(response, "Project status updated successfully"));
    }

    @PatchMapping("/{id}/assign")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Assign Project", description = "Assign a project to an employee")
    public ResponseEntity<BaseResponse<Project>> assignProject(
            @PathVariable UUID id,
            @RequestParam UUID employeeId) {
        Project response = projectService.updateProject(id, projectService.getProjectById(id), employeeId);
        return ResponseEntity.ok(BaseResponse.success(response, "Project assigned successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete Project", description = "Delete a project (Admin only)")
    public ResponseEntity<BaseResponse<Void>> deleteProject(@PathVariable UUID id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok(BaseResponse.success(null, "Project deleted successfully"));
    }
}
