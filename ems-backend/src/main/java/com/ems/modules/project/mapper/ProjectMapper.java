package com.ems.modules.project.mapper;

import com.ems.modules.project.dto.response.ProjectResponse;

import com.ems.entity.Project;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {

    public ProjectResponse toResponse(Project project) {
        if (project == null) {
            return null;
        }
        return ProjectResponse.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .dueDate(project.getDueDate())
                .status(project.getStatus().name())
                .assignedToId(project.getAssignedTo() != null ? project.getAssignedTo().getId() : null)
                .assignedToName(project.getAssignedTo() != null ? project.getAssignedTo().getFullName() : null)
                .score(project.getScore())
                .submittedAt(project.getSubmittedAt())
                .createdAt(project.getCreatedAt())
                .build();
    }
}
