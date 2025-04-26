package com.examgenerator.service;

import com.examgenerator.model.AuthProvider;
import com.examgenerator.model.Role;
import com.examgenerator.model.User;
import com.examgenerator.repository.UserRepository;
import com.examgenerator.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public Map<String, String> register(String email, String password, String firstName, String lastName) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }

        var user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .firstName(firstName)
                .lastName(lastName)
                .provider(AuthProvider.LOCAL)
                .role(Role.USER)
                .build();

        userRepository.save(user);
        setAuthentication(user);

        return generateTokens(user);
    }

    public Map<String, String> authenticate(String email, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));

        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return generateTokens(user);
    }

    public Map<String, String> handleGoogleOAuth(String email, String firstName, String lastName, String providerId) {
        var user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    var newUser = User.builder()
                            .email(email)
                            .firstName(firstName)
                            .lastName(lastName)
                            .provider(AuthProvider.GOOGLE)
                            .providerId(providerId)
                            .role(Role.USER)
                            .build();
                    return userRepository.save(newUser);
                });

        setAuthentication(user);
        return generateTokens(user);
    }

    public Map<String, String> refreshToken(String refreshToken) {
        String email = jwtService.extractUsername(refreshToken);
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (jwtService.isTokenValid(refreshToken, user)) {
            setAuthentication(user);
            return generateTokens(user);
        }
        throw new RuntimeException("Invalid refresh token");
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("No authenticated user found");
        }
        return (User) authentication.getPrincipal();
    }

    private void setAuthentication(User user) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                user,
                null,
                user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }

    private Map<String, String> generateTokens(User user) {
        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", jwtService.generateToken(user));
        tokens.put("refresh_token", jwtService.generateRefreshToken(user));
        return tokens;
    }
}