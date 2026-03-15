package com.ems.modules.announcement.service;

import com.ems.modules.announcement.dto.request.CreateAnnouncementRequest;
import com.ems.modules.announcement.dto.response.AnnouncementResponse;
import com.ems.entity.Announcement;
import com.ems.common.exception.ResourceNotFoundException;
import com.ems.repository.AnnouncementRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    @Transactional
    public AnnouncementResponse createAnnouncement(CreateAnnouncementRequest request) {
        Announcement announcement = Announcement.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .priority(request.getPriority() != null ? request.getPriority() : Announcement.Priority.NORMAL)
                .expiresAt(request.getExpiresAt())
                .build();

        Announcement saved = announcementRepository.save(announcement);
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<AnnouncementResponse> getActiveAnnouncements() {
        return announcementRepository.findActiveAnnouncements(LocalDateTime.now())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteAnnouncement(@NonNull UUID id) {
        if (!announcementRepository.existsById(id)) {
            throw new ResourceNotFoundException("Announcement not found");
        }
        announcementRepository.deleteById(id);
    }

    private AnnouncementResponse mapToResponse(Announcement announcement) {
        return AnnouncementResponse.builder()
                .id(announcement.getId())
                .title(announcement.getTitle())
                .content(announcement.getContent())
                .priority(announcement.getPriority())
                .createdAt(announcement.getCreatedAt())
                .expiresAt(announcement.getExpiresAt())
                .build();
    }
}
