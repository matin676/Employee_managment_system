package com.ems.modules.performance.controller;

import com.ems.common.dto.BaseResponse;
import com.ems.modules.performance.dto.request.CreatePerformanceReviewRequest;
import com.ems.modules.performance.service.PerformanceReviewService;
import com.ems.entity.PerformanceReview;
import com.ems.common.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/performance")
@RequiredArgsConstructor
@Tag(name = "Performance Reviews", description = "Performance Review Management APIs")
public class PerformanceController {

    private final PerformanceReviewService reviewService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create Review", description = "Create a performance review for an employee (Admin only)")
    public ResponseEntity<BaseResponse<PerformanceReview>> createReview(@Valid @RequestBody CreatePerformanceReviewRequest request) {
        PerformanceReview response = reviewService.createReview(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(BaseResponse.success(response, "Performance review created successfully"));
    }

    @GetMapping("/my")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @Operation(summary = "Get My Reviews", description = "Get performance reviews for the current employee")
    public ResponseEntity<BaseResponse<Page<PerformanceReview>>> getMyReviews(
            @AuthenticationPrincipal UserPrincipal userDetails,
            Pageable pageable) {
        Page<PerformanceReview> response = reviewService.getMyReviews(userDetails.getId(), pageable);
        return ResponseEntity.ok(BaseResponse.success(response));
    }

    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get Employee Reviews", description = "Get reviews for a specific employee (Admin only)")
    public ResponseEntity<BaseResponse<Page<PerformanceReview>>> getEmployeeReviews(
            @PathVariable UUID employeeId,
            Pageable pageable) {
        Page<PerformanceReview> response = reviewService.getReviewsByEmployeeId(employeeId, pageable);
        return ResponseEntity.ok(BaseResponse.success(response));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get All Reviews", description = "Get all performance reviews (Admin only)")
    public ResponseEntity<BaseResponse<Page<PerformanceReview>>> getAllReviews(Pageable pageable) {
        Page<PerformanceReview> response = reviewService.getAllReviews(pageable);
        return ResponseEntity.ok(BaseResponse.success(response));
    }
}
