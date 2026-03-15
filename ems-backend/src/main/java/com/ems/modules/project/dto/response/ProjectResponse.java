package com.ems.modules.project.dto.response;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class ProjectResponse {
    private UUID id;
    private String name;
    private String description;
    private LocalDate dueDate;
    private String status;
    private UUID assignedToId;
    private String assignedToName;
    private Integer score;
    private LocalDateTime submittedAt;
    private LocalDateTime createdAt;
}
