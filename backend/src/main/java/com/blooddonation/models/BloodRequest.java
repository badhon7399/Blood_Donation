package com.blooddonation.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Document(collection = "bloodRequests")
public class BloodRequest {
    @Id
    private String id;

    private String recipientId; // Reference to User ID
    private String bloodGroup;
    private Integer units;
    private String urgency; // Normal, Urgent, Critical
    private String status; // Pending, Accepted, Fulfilled, Cancelled
    private String location;
    private LocalDateTime createdAt = LocalDateTime.now();
}
