package com.ems.modules.salary.controller;

import com.ems.common.dto.BaseResponse;
import com.ems.modules.salary.service.SalaryService;
import com.ems.modules.salary.dto.request.CreateSalaryRequest;
import com.ems.modules.salary.dto.response.SalaryResponse;

import com.ems.common.security.UserPrincipal;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/salaries")
@RequiredArgsConstructor
@Tag(name = "Salaries", description = "Payroll management")
public class SalaryController {

    private final SalaryService salaryService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Issue Salary", description = "Issue a salary payment to an employee")
    public ResponseEntity<BaseResponse<SalaryResponse>> issueSalary(@Valid @RequestBody CreateSalaryRequest request) {
        SalaryResponse response = salaryService.issueSalary(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(BaseResponse.success(response, "Salary issued successfully"));
    }

    @GetMapping("/my")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @Operation(summary = "My Pay History", description = "Get salary history for current user")
    public ResponseEntity<BaseResponse<Page<SalaryResponse>>> getMySalaries(
            @AuthenticationPrincipal UserPrincipal userDetails,
            @PageableDefault(size = 10, sort = "paymentDate") Pageable pageable) {
        Page<SalaryResponse> response = salaryService.getMySalaries(userDetails.getId(), pageable);
        return ResponseEntity.ok(BaseResponse.success(response));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "All Pay Records", description = "Get all salary records")
    public ResponseEntity<BaseResponse<Page<SalaryResponse>>> getAllSalaries(
            @PageableDefault(size = 10, sort = "paymentDate") Pageable pageable) {
        Page<SalaryResponse> response = salaryService.getAllSalaries(pageable);
        return ResponseEntity.ok(BaseResponse.success(response));
    }
}
