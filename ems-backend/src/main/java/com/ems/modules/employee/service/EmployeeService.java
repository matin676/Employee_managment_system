package com.ems.modules.employee.service;

import com.ems.modules.employee.dto.request.CreateEmployeeRequest;
import com.ems.modules.employee.dto.response.EmployeeResponse;

import com.ems.modules.employee.mapper.EmployeeMapper;

import com.ems.entity.Employee;
import com.ems.modules.auth.entity.User;
import com.ems.common.exception.ResourceNotFoundException;
import com.ems.common.exception.ResourceConflictException;
import com.ems.repository.EmployeeRepository;
import com.ems.modules.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmployeeMapper employeeMapper;

    @Transactional
    public EmployeeResponse createEmployee(CreateEmployeeRequest request) {
        // 1. Check if email exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResourceConflictException("Email already exists: " + request.getEmail());
        }

        // 2. Create User account
        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.EMPLOYEE)
                .build();
        user = userRepository.save(user);

        // 3. Create Employee profile
        Employee employee = employeeMapper.toEntity(request, user);
        employee = employeeRepository.save(employee);

        return employeeMapper.toResponse(employee);
    }

    @Transactional(readOnly = true)
    public Page<EmployeeResponse> getAllEmployees(String search, Pageable pageable) {
        Page<Employee> employees;
        if (search != null && !search.isEmpty()) {
            employees = employeeRepository.search(search, pageable);
        } else {
            employees = employeeRepository.findAll(pageable);
        }
        return employees.map(employeeMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public EmployeeResponse getEmployeeById(UUID id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", id));
        return employeeMapper.toResponse(employee);
    }

    @Transactional
    public EmployeeResponse updateEmployee(UUID id, CreateEmployeeRequest request) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", id));

        // Update user email if changed (and check uniqueness)
        /*
         * // Logic to update email would go here, checking conflict
         */

        employeeMapper.updateEntity(employee, request);
        employee = employeeRepository.save(employee);

        return employeeMapper.toResponse(employee);
    }

    @Transactional
    public void deleteEmployee(UUID id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", id));

        // 1. Unassign projects (Set assignedTo = null)
        // Using a custom repository method would be even better for performance, 
        // but for now, we'll iterate and rely on JPA dirty checking within the transaction.
        if (employee.getProjects() != null) {
            employee.getProjects().forEach(p -> p.setAssignedTo(null));
        }

        // 2. The User is the 'owner' of the relationship in some senses, 
        // but Employee holds the FK. 
        User user = employee.getUser();

        // 3. Delete Employee (Cascades to Attendance, Leaves, Salaries)
        employeeRepository.delete(employee);

        // 4. Finally delete the User account
        if (user != null) {
            userRepository.delete(user);
        }
    }
}
