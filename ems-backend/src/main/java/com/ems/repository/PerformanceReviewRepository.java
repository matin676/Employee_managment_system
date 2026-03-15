package com.ems.repository;

import com.ems.entity.PerformanceReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PerformanceReviewRepository extends JpaRepository<PerformanceReview, UUID> {
    Page<PerformanceReview> findByEmployeeId(UUID employeeId, Pageable pageable);
}
