package com.examgenerator.controller;

import com.examgenerator.model.User;
import com.examgenerator.service.AuthenticationService;
import com.examgenerator.util.CookieUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final CookieUtil cookieUtil;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(
            @RequestBody Map<String, String> request,
            HttpServletResponse response) {
        Map<String, String> tokens = authenticationService.register(
                request.get("email"),
                request.get("password"),
                request.get("firstName"),
                request.get("lastName"));
        cookieUtil.createAccessTokenCookie(tokens.get("access_token"), response);
        cookieUtil.createRefreshTokenCookie(tokens.get("refresh_token"), response);

        return ResponseEntity.ok(createUserResponse(authenticationService.getCurrentUser()));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody Map<String, String> request,
            HttpServletResponse response) {
        Map<String, String> tokens = authenticationService.authenticate(
                request.get("email"),
                request.get("password"));
        cookieUtil.createAccessTokenCookie(tokens.get("access_token"), response);
        cookieUtil.createRefreshTokenCookie(tokens.get("refresh_token"), response);

        return ResponseEntity.ok(createUserResponse(authenticationService.getCurrentUser()));
    }

    @PostMapping("/google")
    public ResponseEntity<Map<String, Object>> googleAuth(
            @RequestBody Map<String, String> request,
            HttpServletResponse response) {
        Map<String, String> tokens = authenticationService.handleGoogleOAuth(
                request.get("email"),
                request.get("firstName"),
                request.get("lastName"),
                request.get("providerId"));
        cookieUtil.createAccessTokenCookie(tokens.get("access_token"), response);
        cookieUtil.createRefreshTokenCookie(tokens.get("refresh_token"), response);

        return ResponseEntity.ok(createUserResponse(authenticationService.getCurrentUser()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, Object>> refreshToken(
            @CookieValue("refresh_token") String refreshToken,
            HttpServletResponse response) {
        Map<String, String> tokens = authenticationService.refreshToken(refreshToken);
        cookieUtil.createAccessTokenCookie(tokens.get("access_token"), response);
        cookieUtil.createRefreshTokenCookie(tokens.get("refresh_token"), response);

        return ResponseEntity.ok(createUserResponse(authenticationService.getCurrentUser()));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        cookieUtil.clearTokenCookies(response);
        return ResponseEntity.ok().build();
    }

    private Map<String, Object> createUserResponse(User user) {
        Map<String, Object> response = new HashMap<>();
        response.put("user", Map.of(
                "email", user.getEmail(),
                "firstName", user.getFirstName(),
                "lastName", user.getLastName()));
        return response;
    }
}