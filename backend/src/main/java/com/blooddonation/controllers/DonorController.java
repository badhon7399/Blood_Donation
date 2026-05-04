package com.blooddonation.controllers;

import com.blooddonation.models.Donor;
import com.blooddonation.repository.DonorRepository;
import com.blooddonation.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/donors")
public class DonorController {

    @Autowired
    DonorRepository donorRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerDonor(@RequestBody Donor donorRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = userDetails.getId();

        Optional<Donor> existingDonor = donorRepository.findByUserId(userId);
        if (existingDonor.isPresent()) {
            return ResponseEntity.badRequest().body("User is already registered as a donor");
        }

        donorRequest.setUserId(userId);
        if (donorRequest.getStatus() == null) {
            donorRequest.setStatus("Available");
        }
        
        Donor savedDonor = donorRepository.save(donorRequest);
        return ResponseEntity.ok(savedDonor);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyDonorProfile() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Donor> donor = donorRepository.findByUserId(userDetails.getId());

        if (donor.isPresent()) {
            return ResponseEntity.ok(donor.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/status")
    public ResponseEntity<?> updateStatus(@RequestParam String status) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Donor> donorOpt = donorRepository.findByUserId(userDetails.getId());

        if (donorOpt.isPresent()) {
            Donor donor = donorOpt.get();
            donor.setStatus(status);
            donorRepository.save(donor);
            return ResponseEntity.ok(donor);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Donor>> searchDonors(
            @RequestParam(required = false) String bloodGroup,
            @RequestParam(required = false) String location) {
        
        List<Donor> donors;
        
        if (bloodGroup != null && location != null) {
            donors = donorRepository.findByBloodGroupAndLocationContainingIgnoreCase(bloodGroup, location);
        } else if (bloodGroup != null) {
            donors = donorRepository.findByBloodGroup(bloodGroup);
        } else if (location != null) {
            donors = donorRepository.findByLocationContainingIgnoreCase(location);
        } else {
            donors = donorRepository.findAll();
        }
        
        return ResponseEntity.ok(donors);
    }
}
