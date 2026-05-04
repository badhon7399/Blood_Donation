package com.blooddonation.repository;

import com.blooddonation.models.BloodRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BloodRequestRepository extends MongoRepository<BloodRequest, String> {
    List<BloodRequest> findByRecipientId(String recipientId);
    List<BloodRequest> findByStatus(String status);
}
