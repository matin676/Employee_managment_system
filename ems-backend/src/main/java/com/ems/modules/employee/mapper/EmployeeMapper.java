package com.ems.modules.employee.mapper;

import com.ems.modules.employee.dto.request.CreateEmployeeRequest;
import com.ems.modules.employee.dto.response.EmployeeResponse;

import com.ems.entity.Employee;
import com.ems.modules.auth.entity.User;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper {

    public EmployeeResponse toResponse(Employee employee) {
        if (employee == null) {
            return null;
        }

        return EmployeeResponse.builder()
                .id(employee.getId())
                .userId(employee.getUser() != null ? employee.getUser().getId() : null)
                .email(employee.getUser() != null ? employee.getUser().getEmail() : null)
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .fullName(employee.getFullName())
                .dateOfBirth(employee.getDateOfBirth())
                .gender(employee.getGender())
                .phone(employee.getPhone())
                .nationalId(employee.getNationalId())
                .address(employee.getAddress())
                .department(employee.getDepartment())
                .qualification(employee.getQualification())
                .profileImageUrl(employee.getProfileImageUrl())
                .createdAt(employee.getCreatedAt())
                .baseSalary(employee.getBaseSalary())
                .build();
    }

    public Employee toEntity(CreateEmployeeRequest request, User user) {
        return Employee.builder()
                .user(user) // Link to user account
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .phone(request.getPhone())
                .nationalId(request.getNationalId())
                .address(request.getAddress())
                .department(request.getDepartment())
                .qualification(request.getQualification())
                .profileImageUrl(request.getProfileImageUrl())
                .baseSalary(request.getSalary())
                .build();
    }

    public void updateEntity(Employee employee, CreateEmployeeRequest request) {
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setDateOfBirth(request.getDateOfBirth());
        employee.setGender(request.getGender());
        employee.setPhone(request.getPhone());
        employee.setNationalId(request.getNationalId());
        employee.setAddress(request.getAddress());
        employee.setDepartment(request.getDepartment());
        employee.setQualification(request.getQualification());
        if (request.getSalary() != null) {
            employee.setBaseSalary(request.getSalary());
        }
        // profileImageUrl might be handled separately or here
        if (request.getProfileImageUrl() != null) {
            employee.setProfileImageUrl(request.getProfileImageUrl());
        }
    }
}
