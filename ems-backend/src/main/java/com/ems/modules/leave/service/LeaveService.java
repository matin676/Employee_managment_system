package com.ems.modules.leave.service;

import com.ems.entity.Employee;
import com.ems.entity.Leave;
import com.ems.modules.auth.entity.User;
import com.ems.common.exception.ResourceNotFoundException;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.LeaveRepository;
import com.ems.modules.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LeaveService {

    private final LeaveRepository leaveRepository;
    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;

    @Transactional
    public Leave applyLeave(UUID userId, Leave leaveRequest) {
        Employee employee = employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        leaveRequest.setEmployee(employee);
        leaveRequest.setStatus(Leave.LeaveStatus.PENDING);

        return leaveRepository.save(leaveRequest);
    }

    @Transactional(readOnly = true)
    public Page<Leave> getMyLeaves(UUID userId, Pageable pageable) {
        Employee employee = employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        return leaveRepository.findByEmployeeId(employee.getId(), pageable);
    }

    @Transactional(readOnly = true)
    public Page<Leave> getAllLeaves(Pageable pageable) {
        return leaveRepository.findAll(pageable);
    }

    @Transactional
    public Leave updateStatus(UUID id, Leave.LeaveStatus status, UUID reviewerId) {
        Leave leave = leaveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found"));

        User reviewer = userRepository.findById(reviewerId)
                .orElseThrow(() -> new ResourceNotFoundException("Reviewer not found"));

        leave.setStatus(status);
        leave.setReviewedBy(reviewer);
        leave.setReviewedAt(LocalDateTime.now());

        return leaveRepository.save(leave);
    }
}
