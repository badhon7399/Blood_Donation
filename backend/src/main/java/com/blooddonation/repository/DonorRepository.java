package com.blooddonation.repository;

import com.blooddonation.models.Donor;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
import java.util.List;

public interface DonorRepository extends MongoRepository<Donor, String> {
    Optional<Donor> findByUserId(String userId);
    List<Donor> findByBloodGroup(String bloodGroup);
    List<Donor> findByLocationContainingIgnoreCase(String location);
    List<Donor> findByBloodGroupAndLocationContainingIgnoreCase(String bloodGroup, String location);
}
