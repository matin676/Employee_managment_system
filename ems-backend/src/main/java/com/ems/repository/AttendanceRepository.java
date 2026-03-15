package com.ems.repository;

import com.ems.entity.Attendance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

public interface AttendanceRepository extends JpaRepository<Attendance, UUID> {
    Page<Attendance> findByEmployeeId(UUID employeeId, Pageable pageable);

    Optional<Attendance> findByEmployeeIdAndDate(UUID employeeId, LocalDate date);

    boolean existsByEmployeeIdAndDate(UUID employeeId, LocalDate date);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Attendance a " +
            "WHERE a.employee.id = :empId AND a.date = :date AND a.clockOut IS NULL")
    boolean existsByEmployeeIdAndDateAndClockOutIsNull(@Param("empId") UUID employeeId, @Param("date") LocalDate date);

    @Query("SELECT a FROM Attendance a WHERE a.employee.id = :employeeId ORDER BY a.clockIn DESC LIMIT 1")
    Optional<Attendance> findLatestByEmployeeId(@Param("employeeId") UUID employeeId);
}
