package com.ems.repository;

import com.ems.entity.Salary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SalaryRepository extends JpaRepository<Salary, UUID> {
    Page<Salary> findByEmployeeId(UUID employeeId, Pageable pageable);

    boolean existsByEmployeeIdAndMonthYear(UUID employeeId, String monthYear);
}
