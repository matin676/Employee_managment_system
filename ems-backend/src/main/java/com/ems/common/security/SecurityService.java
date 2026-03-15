package com.ems.common.security;

import com.ems.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service("securityService")
@RequiredArgsConstructor
public class SecurityService {

    private final ProjectRepository projectRepository;

    /**
     * Check if the current authenticated employee is assigned to the given project.
     * Admins always have access.
     */
    public boolean canAccessProject(UUID projectId) {
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        if (principal.getRole().name().equals("ADMIN")) {
            return true;
        }

        if (principal.getEmployeeId() == null) {
            return false;
        }

        return projectRepository.findById(projectId)
                .map(project -> project.getAssignedTo() != null && 
                                project.getAssignedTo().getId().equals(principal.getEmployeeId()))
                .orElse(false);
    }

    /**
     * Check if the current user is the owner of the given employee record.
     * Admins always have access.
     */
    public boolean isSelf(UUID employeeId) {
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        if (principal.getRole().name().equals("ADMIN")) {
            return true;
        }

        return employeeId.equals(principal.getEmployeeId());
    }
}
