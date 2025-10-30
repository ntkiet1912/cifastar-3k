package com.theatermgnt.theatermgnt.entity.Movie;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "age_ratings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgeRating {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "code", unique = true, nullable = false, length = 10)
    private String code;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}