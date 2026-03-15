package com.ems.modules.project.service;

import com.ems.entity.Employee;
import com.ems.entity.Project;
import com.ems.common.exception.ResourceNotFoundException;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final EmployeeRepository employeeRepository;

    @Transactional
    public Project createProject(Project project, UUID assignedToId) {
        if (assignedToId != null) {
            Employee employee = employeeRepository.findById(assignedToId)
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
            project.setAssignedTo(employee);
            project.setStatus(Project.ProjectStatus.ASSIGNED);
        } else {
            project.setStatus(Project.ProjectStatus.ASSIGNED);
        }
        return projectRepository.save(project);
    }

    public Page<Project> getAllProjects(Pageable pageable) {
        return projectRepository.findAll(pageable);
    }

    public Page<Project> getMyProjects(UUID userId, Pageable pageable) {
        Employee employee = employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        return projectRepository.findByAssignedToId(employee.getId(), pageable);
    }

    public Project getProjectById(UUID id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
    }

    @Transactional
    public Project updateProject(UUID id, Project projectDetails, UUID assignedToId) {
        Project project = getProjectById(id);

        project.setName(projectDetails.getName());
        project.setDescription(projectDetails.getDescription());
        project.setDueDate(projectDetails.getDueDate());
        
        if (projectDetails.getStatus() != null) {
            project.setStatus(projectDetails.getStatus());
        }

        if (assignedToId != null) {
            Employee employee = employeeRepository.findById(assignedToId)
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
            project.setAssignedTo(employee);
        }

        return projectRepository.save(project);
    }

    @Transactional
    public Project updateProjectStatus(UUID id, Project.ProjectStatus status) {
        Project project = getProjectById(id);
        project.setStatus(status);
        if (status == Project.ProjectStatus.SUBMITTED) {
            project.setSubmittedAt(java.time.LocalDateTime.now());
        }
        return projectRepository.save(project);
    }

    @Transactional
    public void deleteProject(UUID id) {
        Project project = getProjectById(id);
        projectRepository.delete(project);
    }
}
