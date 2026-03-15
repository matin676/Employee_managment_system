package com.ems.modules.announcement.dto.response;

import com.ems.entity.Announcement;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class AnnouncementResponse {
    private UUID id;
    private String title;
    private String content;
    private Announcement.Priority priority;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
}
