package com.ems.modules.leave.controller;

import com.ems.common.dto.BaseResponse;
import com.ems.modules.leave.service.LeaveService;

import com.ems.entity.Leave;
import com.ems.common.security.UserPrincipal;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.UUID;

@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
@Tag(name = "Leaves", description = "Leave management endpoints")
public class LeaveController {

    private final LeaveService leaveService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @Operation(summary = "Apply for leave", description = "Submit a new leave application")
    public ResponseEntity<BaseResponse<Leave>> applyForLeave(
            @AuthenticationPrincipal UserPrincipal userDetails,
            @Valid @RequestBody Leave leaveRequest) {
        Leave response = leaveService.applyLeave(userDetails.getId(), leaveRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(BaseResponse.success(response, "Leave application submitted"));
    }

    @GetMapping("/my")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @Operation(summary = "Get my leaves", description = "Get list of leave applications for current user")
    public ResponseEntity<BaseResponse<Page<Leave>>> getMyLeaves(
            @AuthenticationPrincipal UserPrincipal userDetails,
            @PageableDefault(size = 10, sort = "createdAt") Pageable pageable) {
        Page<Leave> response = leaveService.getMyLeaves(userDetails.getId(), pageable);
        return ResponseEntity.ok(BaseResponse.success(response));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all leaves", description = "Get all leave applications (Admin only)")
    public ResponseEntity<BaseResponse<Page<Leave>>> getAllLeaves(
            @PageableDefault(size = 10, sort = "createdAt") Pageable pageable) {
        Page<Leave> response = leaveService.getAllLeaves(pageable);
        return ResponseEntity.ok(BaseResponse.success(response));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update Leave Status", description = "Approve or Reject a leave request")
    public ResponseEntity<BaseResponse<Leave>> updateLeaveStatus(
            @PathVariable UUID id,
            @RequestParam Leave.LeaveStatus status,
            @AuthenticationPrincipal UserPrincipal userDetails) {
        Leave response = leaveService.updateStatus(id, status, userDetails.getId());
        return ResponseEntity.ok(BaseResponse.success(response, "Leave status updated successfully"));
    }
}
