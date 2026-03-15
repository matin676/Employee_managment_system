package com.ems.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "attendance", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "employee_id", "date" })
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Employee employee;

    @Column(nullable = false)
    private LocalDate date;

    private LocalDateTime clockIn;

    private LocalDateTime clockOut;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private AttendanceStatus status = AttendanceStatus.PRESENT;

    private String notes;

    public enum AttendanceStatus {
        PRESENT, ABSENT, LATE, HALF_DAY
    }

    @Transient
    public Double getHoursWorked() {
        if (clockIn == null || clockOut == null)
            return null;
        return java.time.Duration.between(clockIn, clockOut).toMinutes() / 60.0;
    }
}
