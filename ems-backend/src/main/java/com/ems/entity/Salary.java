package com.ems.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "salaries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Salary {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Employee employee;

    @Column(nullable = false, precision = 12, scale = 2)
    @NotNull(message = "Base salary is required")
    private BigDecimal baseSalary;

    @Column(precision = 12, scale = 2)
    private BigDecimal bonuses;

    @Column(precision = 12, scale = 2)
    private BigDecimal deductions;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal totalSalary;

    @Column(nullable = false)
    @NotNull(message = "Payment date is required")
    private LocalDate paymentDate;

    // E.g. "2024-01" to ensure one salary slip per month per employee
    @Column(nullable = false)
    @NotNull(message = "Month/Year identifier is required")
    private String monthYear;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private PaymentStatus status = PaymentStatus.PENDING;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public enum PaymentStatus {
        PENDING, PAID, CANCELLED
    }
}
