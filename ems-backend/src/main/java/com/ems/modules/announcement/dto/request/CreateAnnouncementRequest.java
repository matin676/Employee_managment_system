package com.ems.modules.announcement.dto.request;

import com.ems.entity.Announcement;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateAnnouncementRequest {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Content is required")
    private String content;

    private Announcement.Priority priority;
    private LocalDateTime expiresAt;
}
