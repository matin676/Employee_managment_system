package com.ems.modules.auth.service;

import com.ems.modules.auth.dto.request.LoginRequest;
import com.ems.modules.auth.dto.response.AuthResponse;

import java.util.Objects;

import com.ems.entity.Employee;
import com.ems.modules.auth.entity.User;
import com.ems.common.exception.ResourceNotFoundException;
import com.ems.repository.EmployeeRepository;
import com.ems.modules.auth.repository.UserRepository;
import com.ems.common.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        String token = tokenProvider.generateToken(authentication);

        User user = Objects.requireNonNull(userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail())));

        // Get employee info if role is EMPLOYEE
        String firstName = "Admin";
        String lastName = "";
        if (user.getRole() == User.Role.EMPLOYEE) {
            Employee employee = employeeRepository.findByUserId(user.getId())
                    .orElse(null);
            if (employee != null) {
                firstName = employee.getFirstName();
                lastName = employee.getLastName();
            }
        }

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(AuthResponse.UserInfo.builder()
                        .id(user.getId().toString())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .firstName(firstName)
                        .lastName(lastName)
                        .build())
                .build();
    }

    @Transactional
    public User createAdminUser(String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }

        User admin = User.builder()
                .email(email)
                .passwordHash(passwordEncoder.encode(password))
                .role(User.Role.ADMIN)
                .build();

        return userRepository.save(Objects.requireNonNull(admin));
    }
}
