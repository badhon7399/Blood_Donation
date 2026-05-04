package com.blooddonation.controllers;

import com.blooddonation.models.BloodRequest;
import com.blooddonation.repository.BloodRequestRepository;
import com.blooddonation.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/requests")
public class BloodRequestController {

    @Autowired
    BloodRequestRepository bloodRequestRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createRequest(@RequestBody BloodRequest request) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        request.setRecipientId(userDetails.getId());
        request.setStatus("Pending");
        request.setCreatedAt(LocalDateTime.now());
        
        BloodRequest savedRequest = bloodRequestRepository.save(request);
        return ResponseEntity.ok(savedRequest);
    }

    @GetMapping("/me")
    public ResponseEntity<List<BloodRequest>> getMyRequests() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<BloodRequest> requests = bloodRequestRepository.findByRecipientId(userDetails.getId());
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/active")
    public ResponseEntity<List<BloodRequest>> getActiveRequests() {
        List<BloodRequest> requests = bloodRequestRepository.findByStatus("Pending");
        return ResponseEntity.ok(requests);
    }
}
