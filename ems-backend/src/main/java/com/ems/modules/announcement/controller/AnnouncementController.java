package com.ems.modules.announcement.controller;

import com.ems.common.dto.BaseResponse;
import com.ems.modules.announcement.dto.request.CreateAnnouncementRequest;
import com.ems.modules.announcement.dto.response.AnnouncementResponse;
import com.ems.modules.announcement.service.AnnouncementService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
@Tag(name = "Announcements", description = "Company-wide broadcasts")
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create Announcement", description = "Create a new broadcast (Admin only)")
    public ResponseEntity<BaseResponse<AnnouncementResponse>> create(@Valid @RequestBody CreateAnnouncementRequest request) {
        AnnouncementResponse response = announcementService.createAnnouncement(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(BaseResponse.success(response, "Announcement created successfully"));
    }

    @GetMapping
    @Operation(summary = "Get Active Announcements", description = "Retrieve all currently active broadcasts")
    public ResponseEntity<BaseResponse<List<AnnouncementResponse>>> getActive() {
        List<AnnouncementResponse> response = announcementService.getActiveAnnouncements();
        return ResponseEntity.ok(BaseResponse.success(response));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete Announcement", description = "Remove a broadcast (Admin only)")
    public ResponseEntity<BaseResponse<Void>> delete(@PathVariable UUID id) {
        announcementService.deleteAnnouncement(id);
        return ResponseEntity.ok(BaseResponse.success(null, "Announcement deleted successfully"));
    }
}
