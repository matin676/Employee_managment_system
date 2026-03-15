package com.ems.modules.auth.controller;

import com.ems.common.dto.BaseResponse;
import com.ems.modules.auth.service.AuthService;
import com.ems.modules.auth.dto.request.LoginRequest;
import com.ems.modules.auth.dto.response.AuthResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Auth endpoints")
public class AuthController {

    private final AuthService authService;

    @org.springframework.beans.factory.annotation.Value("${app.jwt.expiration}")
    private long jwtExpiration;

    @PostMapping("/login")
    @Operation(summary = "Authenticate user", description = "Returns JWT token in HttpOnly Cookie")
    public ResponseEntity<BaseResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);

        org.springframework.http.ResponseCookie cookie = org.springframework.http.ResponseCookie
                .from("accessToken", java.util.Objects.requireNonNull(response.getToken()))
                .httpOnly(true)
                .secure(false) // Set to true if using HTTPS in production
                .path("/")
                .maxAge(jwtExpiration / 1000)
                .sameSite("Lax") // Changed from Strict to Lax for better cross-origin stability if needed, or stick to Strict if tightly coupled
                .build();

        return ResponseEntity.ok()
                .header(org.springframework.http.HttpHeaders.SET_COOKIE, cookie.toString())
                .body(BaseResponse.success(response, "Login successful"));
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout user", description = "Clears the authentication cookie")
    public ResponseEntity<BaseResponse<Void>> logout() {
        org.springframework.http.ResponseCookie cookie = org.springframework.http.ResponseCookie.from("accessToken", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(org.springframework.http.HttpHeaders.SET_COOKIE, cookie.toString())
                .body(BaseResponse.success(null, "Logged out successfully"));
    }

    @GetMapping("/health")
    @Operation(summary = "Health check", description = "Check if API is running")
    public ResponseEntity<BaseResponse<String>> health() {
        return ResponseEntity.ok(BaseResponse.success("OK", "Service is healthy"));
    }
}
