package com.ems.modules.salary.service;

import com.ems.modules.salary.dto.request.CreateSalaryRequest;
import com.ems.modules.salary.dto.response.SalaryResponse;

import com.ems.entity.Employee;
import com.ems.entity.Salary;
import com.ems.common.exception.ResourceConflictException;
import com.ems.common.exception.ResourceNotFoundException;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.SalaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SalaryService {

    private final SalaryRepository salaryRepository;
    private final EmployeeRepository employeeRepository;

    @Transactional
    public SalaryResponse issueSalary(CreateSalaryRequest request) {
        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        if (request.getPaymentDate() == null) {
            throw new IllegalArgumentException("Payment date cannot be null");
        }
        if (request.getBaseSalary() == null) {
            throw new IllegalArgumentException("Base salary cannot be null");
        }

        String monthYear = request.getPaymentDate().format(DateTimeFormatter.ofPattern("yyyy-MM"));

        if (salaryRepository.existsByEmployeeIdAndMonthYear(employee.getId(), monthYear)) {
            throw new ResourceConflictException("Salary already issued for this employee for month: " + monthYear);
        }

        BigDecimal bonuses = request.getBonuses() != null ? request.getBonuses() : BigDecimal.ZERO;
        BigDecimal deductions = request.getDeductions() != null ? request.getDeductions() : BigDecimal.ZERO;
        BigDecimal total = request.getBaseSalary().add(bonuses).subtract(deductions);

        Salary salary = Salary.builder()
                .employee(employee)
                .baseSalary(request.getBaseSalary())
                .bonuses(bonuses)
                .deductions(deductions)
                .totalSalary(total)
                .paymentDate(request.getPaymentDate())
                .monthYear(monthYear)
                .status(Salary.PaymentStatus.PAID) // Auto-mark as paid for now
                .build();

        Salary savedSalary = salaryRepository.save(salary);
        return mapToResponse(savedSalary);
    }

    @Transactional(readOnly = true)
    public Page<SalaryResponse> getMySalaries(UUID userId, Pageable pageable) {
        Employee employee = employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee record not found for this user"));

        return salaryRepository.findByEmployeeId(employee.getId(), pageable)
                .map(this::mapToResponse);
    }

    @Transactional(readOnly = true)
    public Page<SalaryResponse> getAllSalaries(Pageable pageable) {
        return salaryRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    private SalaryResponse mapToResponse(Salary salary) {
        return SalaryResponse.builder()
                .id(salary.getId())
                .employeeId(salary.getEmployee().getId())
                .employeeName(salary.getEmployee().getFullName())
                .baseSalary(salary.getBaseSalary())
                .bonuses(salary.getBonuses())
                .deductions(salary.getDeductions())
                .totalSalary(salary.getTotalSalary())
                .paymentDate(salary.getPaymentDate())
                .monthYear(salary.getMonthYear())
                .status(salary.getStatus())
                .build();
    }
}
