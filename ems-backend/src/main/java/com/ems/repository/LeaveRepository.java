package com.ems.repository;

import com.ems.entity.Leave;
import com.ems.entity.Leave.LeaveStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface LeaveRepository extends JpaRepository<Leave, UUID> {

    Page<Leave> findByEmployeeId(UUID employeeId, Pageable pageable);

    Page<Leave> findByStatus(LeaveStatus status, Pageable pageable);

    List<Leave> findByStatusAndEndDateGreaterThanEqualAndStartDateLessThanEqual(LeaveStatus status, LocalDate start,
            LocalDate end);

    List<Leave> findByEmployeeIdAndStatus(UUID employeeId, LeaveStatus status);

    @Query("SELECT l FROM Leave l WHERE l.employee.id = :empId AND l.status = 'APPROVED' " +
            "AND YEAR(l.startDate) = :year")
    List<Leave> findApprovedLeavesForYear(@Param("empId") UUID employeeId, @Param("year") int year);

    @Query("SELECT COUNT(l) FROM Leave l WHERE l.status = :status")
    long countByStatus(@Param("status") LeaveStatus status);

    @Query("SELECT l.status, COUNT(l) FROM Leave l GROUP BY l.status")
    List<Object[]> countGroupByStatus();
}
