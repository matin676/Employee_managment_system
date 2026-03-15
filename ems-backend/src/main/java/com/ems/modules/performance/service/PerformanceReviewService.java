package com.ems.modules.performance.service;

import com.ems.modules.performance.dto.request.CreatePerformanceReviewRequest;
import com.ems.entity.Employee;
import com.ems.entity.PerformanceReview;
import com.ems.common.exception.ResourceNotFoundException;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.PerformanceReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PerformanceReviewService {

    private final PerformanceReviewRepository reviewRepository;
    private final EmployeeRepository employeeRepository;

    @Transactional
    public PerformanceReview createReview(CreatePerformanceReviewRequest request) {
        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        PerformanceReview review = PerformanceReview.builder()
                .employee(employee)
                .rating(request.getRating())
                .feedback(request.getFeedback())
                .reviewDate(LocalDate.now())
                .build();

        return reviewRepository.save(review);
    }

    public Page<PerformanceReview> getMyReviews(UUID userId, Pageable pageable) {
        Employee employee = employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        return reviewRepository.findByEmployeeId(employee.getId(), pageable);
    }

    public Page<PerformanceReview> getReviewsByEmployeeId(UUID employeeId, Pageable pageable) {
        return reviewRepository.findByEmployeeId(employeeId, pageable);
    }

    public Page<PerformanceReview> getAllReviews(Pageable pageable) {
        return reviewRepository.findAll(pageable);
    }
}
