package com.ems.modules.dashboard.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardStatsResponse {
    // Admin Stats
    private Long totalEmployees;
    private Long activeDepartments;
    private Long pendingLeaves;
    private Long activeProjects;

    // Employee Stats
    private Long myPendingLeaves;
    private Long myActiveProjects;
}
