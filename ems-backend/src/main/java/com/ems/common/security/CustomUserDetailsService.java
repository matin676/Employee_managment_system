package com.ems.common.security;

import com.ems.modules.auth.entity.User;
import com.ems.modules.auth.repository.UserRepository;
import com.ems.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        
        UUID employeeId = employeeRepository.findByUserId(user.getId())
                .map(e -> e.getId())
                .orElse(null);

        return UserPrincipal.create(user, employeeId);
    }

    @Transactional(readOnly = true)
    public UserDetails loadUserById(UUID id) {
        User user = userRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + id));

        UUID employeeId = employeeRepository.findByUserId(user.getId())
                .map(e -> e.getId())
                .orElse(null);

        return UserPrincipal.create(user, employeeId);
    }
}
