package com.ems.modules.dashboard.service;

import com.ems.modules.dashboard.dto.response.DashboardStatsResponse;
import com.ems.entity.Leave;
import com.ems.entity.Project;
import com.ems.common.exception.ResourceNotFoundException;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.LeaveRepository;
import com.ems.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DashboardService {

        private final EmployeeRepository employeeRepository;
        private final LeaveRepository leaveRepository;
        private final ProjectRepository projectRepository;

        @Transactional(readOnly = true)
        public DashboardStatsResponse getStats(UUID userId, boolean isAdmin) {
                if (isAdmin) {
                        return DashboardStatsResponse.builder()
                                        .totalEmployees(employeeRepository.count())
                                        .activeDepartments((long) employeeRepository.findAllDepartments().size())
                                        .pendingLeaves(leaveRepository.countByStatus(Leave.LeaveStatus.PENDING))
                                        .activeProjects(projectRepository
                                                        .countByStatus(Project.ProjectStatus.IN_PROGRESS)) // Or sum of
                                                                                                           // IN_PROGRESS
                                                                                                           // +
                                                                                                           // ASSIGNED
                                        .build();
                } else {
                        // Need to get Employee ID from User ID first for some queries if they rely on
                        // Employee ID
                        // Assuming we have a way to get employee ID or repository methods support User
                        // ID.
                        // Repositories currently use Employee ID.
                        var employee = employeeRepository.findByUserId(userId)
                                        .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

                        return DashboardStatsResponse.builder()
                                        .myPendingLeaves((long) leaveRepository
                                                        .findByEmployeeIdAndStatus(employee.getId(),
                                                                        Leave.LeaveStatus.PENDING)
                                                        .size())
                                        .myActiveProjects((long) projectRepository
                                                        .findByAssignedToIdAndStatus(employee.getId(),
                                                                        Project.ProjectStatus.IN_PROGRESS)
                                                        .size())
                                        .build();
                }
        }
}
