package com.ems.modules.dashboard.controller;

import com.ems.common.dto.BaseResponse;
import com.ems.modules.dashboard.dto.response.DashboardStatsResponse;
import com.ems.common.security.UserPrincipal;
import com.ems.modules.dashboard.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Dashboard statistics endpoints")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @Operation(summary = "Get dashboard statistics", description = "Get stats based on current user role")
    public ResponseEntity<BaseResponse<DashboardStatsResponse>> getStats(@AuthenticationPrincipal UserPrincipal userDetails) {
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        DashboardStatsResponse response = dashboardService.getStats(userDetails.getId(), isAdmin);
        return ResponseEntity.ok(BaseResponse.success(response));
    }
}
