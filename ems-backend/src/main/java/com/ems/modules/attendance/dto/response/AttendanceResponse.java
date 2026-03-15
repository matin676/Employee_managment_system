package com.ems.modules.attendance.dto.response;

import com.ems.entity.Attendance.AttendanceStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class AttendanceResponse {
    private UUID id;
    private String employeeName;
    private UUID employeeId;
    private LocalDate date;
    private LocalDateTime clockIn;
    private LocalDateTime clockOut;
    private AttendanceStatus status;
    private String notes;
    private Double hoursWorked;
}
