package com.ems.modules.attendance.service;

import com.ems.modules.attendance.dto.response.AttendanceResponse;

import com.ems.entity.Attendance;
import com.ems.entity.Employee;
import com.ems.common.exception.ResourceConflictException;
import com.ems.common.exception.ResourceNotFoundException;
import com.ems.repository.AttendanceRepository;
import com.ems.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AttendanceService {

        private final AttendanceRepository attendanceRepository;
        private final EmployeeRepository employeeRepository;

        @Transactional
        public AttendanceResponse clockIn(UUID userId) {
                Employee employee = employeeRepository.findByUserId(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

                if (attendanceRepository.existsByEmployeeIdAndDate(employee.getId(), LocalDate.now())) {
                        throw new ResourceConflictException("Attendance already marked for today");
                }

                // Check if there is an open check-in without check-out
                boolean hasOpenCheckIn = attendanceRepository.findByEmployeeId(employee.getId(), Pageable.unpaged())
                                .stream()
                                .anyMatch(a -> a.getClockOut() == null);

                if (hasOpenCheckIn) {
                        throw new ResourceConflictException(
                                        "You already have an active check-in. Please clock out first.");
                }

                Attendance attendance = Attendance.builder()
                                .employee(employee)
                                .clockIn(LocalDateTime.now())
                                .date(LocalDate.now())
                                .status(Attendance.AttendanceStatus.PRESENT)
                                .build();
                return mapToResponse(attendanceRepository.save(attendance));
        }

        @Transactional
        public AttendanceResponse checkOut(UUID userId, String notes) {
                Employee employee = employeeRepository.findByUserId(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

                Attendance attendance = attendanceRepository.findLatestByEmployeeId(employee.getId())
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "No active attendance found to clock out"));

                if (attendance.getClockOut() != null) {
                        throw new ResourceConflictException("Already clocked out for today");
                }

                attendance.setClockOut(LocalDateTime.now());
                attendance.setNotes(notes);

                // Calculate hours worked (simple diff)
                // ... (logic handled in getter usually or here)

                return mapToResponse(attendanceRepository.save(attendance));
        }

        @Transactional(readOnly = true)
        public Page<AttendanceResponse> getMyAttendance(UUID userId,
                        Pageable pageable) {
                Employee employee = employeeRepository.findByUserId(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
                return attendanceRepository.findByEmployeeId(employee.getId(), pageable)
                                .map(this::mapToResponse);
        }

        public Page<AttendanceResponse> getAllAttendance(Pageable pageable) {
                return attendanceRepository.findAll(pageable)
                                .map(this::mapToResponse);
        }

        private AttendanceResponse mapToResponse(Attendance attendance) {
                return AttendanceResponse.builder()
                                .id(attendance.getId())
                                .employeeId(attendance.getEmployee().getId())
                                .employeeName(attendance.getEmployee().getFullName())
                                .date(attendance.getDate())
                                .clockIn(attendance.getClockIn())
                                .clockOut(attendance.getClockOut())
                                .status(attendance.getStatus())
                                .notes(attendance.getNotes())
                                .hoursWorked(attendance.getHoursWorked())
                                .build();
        }
}
