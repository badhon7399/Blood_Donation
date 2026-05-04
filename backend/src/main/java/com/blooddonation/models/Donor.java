package com.blooddonation.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Document(collection = "donors")
public class Donor {
    @Id
    private String id;

    private String userId; // Reference to User ID
    private String bloodGroup; // A+, A-, B+, B-, O+, O-, AB+, AB-
    private String location; // City/District
    private LocalDate lastDonation;
    private String status; // Available, Not Available
    private Double latitude;
    private Double longitude;
}
