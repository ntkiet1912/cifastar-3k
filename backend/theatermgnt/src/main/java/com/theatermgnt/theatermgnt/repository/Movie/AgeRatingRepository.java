package com.theatermgnt.theatermgnt.repository.Movie;

import com.theatermgnt.theatermgnt.entity.Movie.AgeRating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AgeRatingRepository extends JpaRepository<AgeRating , String> {
    Optional<AgeRating> findByCode(String code);
}
