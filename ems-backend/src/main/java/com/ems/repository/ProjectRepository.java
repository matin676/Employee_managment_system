package com.ems.repository;

import com.ems.entity.Project;
import com.ems.entity.Project.ProjectStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {

    Page<Project> findByAssignedToId(UUID employeeId, Pageable pageable);

    List<Project> findByAssignedToIdAndStatus(UUID employeeId, ProjectStatus status);

    Page<Project> findByStatus(ProjectStatus status, Pageable pageable);

    List<Project> findByStatusAndDueDateBetween(ProjectStatus status, LocalDate start, LocalDate end);

    long countByStatus(ProjectStatus status);
}
