package com.ems.common.config;

import com.ems.modules.auth.entity.User;
import com.ems.modules.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Objects;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitConfig {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initData() {
        return args -> {
            // Create default admin if not exists
            if (userRepository.findByEmail("admin@ems.com").isEmpty()) {
                User admin = User.builder()
                        .email("admin@ems.com")
                        .passwordHash(passwordEncoder.encode("admin123"))
                        .role(User.Role.ADMIN)
                        .build();
                userRepository.save(Objects.requireNonNull(admin));
                log.info("Default admin user created: admin@ems.com / admin123");
            }
        };
    }
}
