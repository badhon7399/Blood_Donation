package com.blooddonation.controllers;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonation.models.ERole;
import com.blooddonation.models.User;
import com.blooddonation.payload.request.LoginRequest;
import com.blooddonation.payload.request.SignupRequest;
import com.blooddonation.payload.response.JwtResponse;
import com.blooddonation.payload.response.MessageResponse;
import com.blooddonation.repository.UserRepository;
import com.blooddonation.security.jwt.JwtUtils;
import com.blooddonation.security.services.UserDetailsImpl;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(normalizeEmail(loginRequest.getEmail()), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String role = userDetails.getAuthorities().stream().findFirst().get().getAuthority();

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getName(),
                userDetails.getEmail(),
                role));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        String email = normalizeEmail(signUpRequest.getEmail());

        if (userRepository.existsByEmail(email)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getName(),
                email,
                encoder.encode(signUpRequest.getPassword()),
                null,
                signUpRequest.getPhone());

        user.setRole(resolveRole(signUpRequest.getRole()));
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }

    private ERole resolveRole(String role) {
        if (role == null || role.isBlank()) {
            return ERole.ROLE_DONOR;
        }

        return switch (role.trim().toLowerCase()) {
            case "admin", "role_admin" -> ERole.ROLE_ADMIN;
            case "recipient", "role_recipient" -> ERole.ROLE_RECIPIENT;
            case "hospital", "role_hospital" -> ERole.ROLE_HOSPITAL;
            case "donor", "role_donor" -> ERole.ROLE_DONOR;
            default -> ERole.ROLE_DONOR;
        };
    }
}
