package com.ems.modules.project.dto.request;

import com.ems.entity.Project.ProjectStatus;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class CreateProjectRequest {
    private String name;
    private String description;
    private LocalDate dueDate;
    private ProjectStatus status;
    private UUID assignedToId;
}
