package com.ems.modules.salary.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
public class CreateSalaryRequest {
    @NotNull(message = "Employee ID is required")
    private UUID employeeId;

    @NotNull(message = "Base salary is required")
    private BigDecimal baseSalary;

    private BigDecimal bonuses;
    private BigDecimal deductions;

    @NotNull(message = "Payment date is required")
    private LocalDate paymentDate;

    // We can auto-generate monthYear from paymentDate, but explicit is fine too.
    // Let's derive it in service usually, but simpler to pass if needed.
    // Let's assume service derives it from paymentDate.
}
