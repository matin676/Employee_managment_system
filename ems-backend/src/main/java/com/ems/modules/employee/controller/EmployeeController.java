package com.ems.modules.employee.controller;

import com.ems.common.dto.BaseResponse;
import com.ems.modules.employee.service.EmployeeService;
import com.ems.modules.employee.dto.request.CreateEmployeeRequest;
import com.ems.modules.employee.dto.response.EmployeeResponse;

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
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@Tag(name = "Employees", description = "Employee management endpoints")
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create new employee", description = "Creates a new employee with user account and initial salary")
    public ResponseEntity<BaseResponse<EmployeeResponse>> createEmployee(@Valid @RequestBody CreateEmployeeRequest request) {
        EmployeeResponse response = employeeService.createEmployee(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(BaseResponse.success(response, "Employee created successfully"));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all employees", description = "Retrieve paginated list of employees with search")
    public ResponseEntity<BaseResponse<Page<EmployeeResponse>>> getAllEmployees(
            @RequestParam(required = false) String search,
            @PageableDefault(size = 10, sort = "lastName") Pageable pageable) {
        Page<EmployeeResponse> response = employeeService.getAllEmployees(search, pageable);
        return ResponseEntity.ok(BaseResponse.success(response));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isSelf(#id)")
    @Operation(summary = "Get employee by ID", description = "Retrieve specific employee details")
    public ResponseEntity<BaseResponse<EmployeeResponse>> getEmployeeById(@PathVariable UUID id) {
        EmployeeResponse response = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(BaseResponse.success(response));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update employee", description = "Update employee details")
    public ResponseEntity<BaseResponse<EmployeeResponse>> updateEmployee(
            @PathVariable UUID id,
            @Valid @RequestBody CreateEmployeeRequest request) {
        EmployeeResponse response = employeeService.updateEmployee(id, request);
        return ResponseEntity.ok(BaseResponse.success(response, "Employee updated successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete employee", description = "Delete employee and associated user account")
    public ResponseEntity<BaseResponse<Void>> deleteEmployee(@PathVariable UUID id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok(BaseResponse.success(null, "Employee deleted successfully"));
    }
}
