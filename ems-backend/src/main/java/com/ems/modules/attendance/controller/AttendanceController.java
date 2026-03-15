package com.ems.modules.attendance.controller;

import com.ems.common.dto.BaseResponse;
import com.ems.modules.attendance.service.AttendanceService;
import com.ems.modules.attendance.dto.response.AttendanceResponse;

import com.ems.common.security.UserPrincipal;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
@Tag(name = "Attendance", description = "Attendance tracking endpoints")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/clock-in")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @Operation(summary = "Clock In", description = "Record start of work day")
    public ResponseEntity<BaseResponse<AttendanceResponse>> clockIn(@AuthenticationPrincipal UserPrincipal userDetails) {
        AttendanceResponse response = attendanceService.clockIn(userDetails.getId());
        return ResponseEntity.ok(BaseResponse.success(response, "Clock-in successful"));
    }

    @PostMapping("/checkout")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @Operation(summary = "Clock Out", description = "Clock out for the day")
    public ResponseEntity<BaseResponse<AttendanceResponse>> checkOut(@AuthenticationPrincipal UserPrincipal userDetails) {
        AttendanceResponse response = attendanceService.checkOut(userDetails.getId(), null);
        return ResponseEntity.ok(BaseResponse.success(response, "Check-out successful"));
    }

    @GetMapping("/my")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @Operation(summary = "Get my attendance", description = "Get attendance history for current user")
    public ResponseEntity<BaseResponse<Page<AttendanceResponse>>> getMyAttendance(
            @AuthenticationPrincipal UserPrincipal userDetails,
            @PageableDefault(size = 31, sort = "date") Pageable pageable) {
        Page<AttendanceResponse> response = attendanceService.getMyAttendance(userDetails.getId(), pageable);
        return ResponseEntity.ok(BaseResponse.success(response));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all attendance", description = "Get all attendance records (Admin only)")
    public ResponseEntity<BaseResponse<Page<AttendanceResponse>>> getAllAttendance(
            @PageableDefault(size = 31, sort = "date") Pageable pageable) {
        Page<AttendanceResponse> response = attendanceService.getAllAttendance(pageable);
        return ResponseEntity.ok(BaseResponse.success(response));
    }
}
