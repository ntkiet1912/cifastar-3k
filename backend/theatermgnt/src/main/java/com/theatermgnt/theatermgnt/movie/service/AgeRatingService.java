package com.theatermgnt.theatermgnt.movie.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.theatermgnt.theatermgnt.common.exception.ResourceNotFoundException;
import com.theatermgnt.theatermgnt.movie.dto.request.CreateAgeRatingRequest;
import com.theatermgnt.theatermgnt.movie.dto.response.AgeRatingResponse;
import com.theatermgnt.theatermgnt.movie.entity.AgeRating;
import com.theatermgnt.theatermgnt.movie.mapper.AgeRatingMapper;
import com.theatermgnt.theatermgnt.movie.repository.AgeRatingRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AgeRatingService {

    AgeRatingRepository ageRatingRepository;
    AgeRatingMapper ageRatingMapper;

    // CREATE
    public AgeRatingResponse createAgeRating(CreateAgeRatingRequest request) {
        AgeRating ageRating = new AgeRating();
        ageRating.setId(request.getId());
        ageRating.setCode(request.getCode());
        ageRating.setDescription(request.getDescription());

        AgeRating savedAgeRating = ageRatingRepository.save(ageRating);
        return ageRatingMapper.toAgeRatingResponse(savedAgeRating);
    }

    // READ
    public List<AgeRatingResponse> getAllAgeRatings() {
        List<AgeRating> ageRatings = ageRatingRepository.findAll();
        return ageRatingMapper.toAgeRatingResponseList(ageRatings);
    }

    public AgeRatingResponse getAgeRatingById(String id) {
        AgeRating ageRating = ageRatingRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AgeRating", "id", id));
        return ageRatingMapper.toAgeRatingResponse(ageRating);
    }

    public AgeRatingResponse getAgeRatingByCode(String code) {
        AgeRating ageRating = ageRatingRepository
                .findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("AgeRating", "code", code));
        return ageRatingMapper.toAgeRatingResponse(ageRating);
    }
}
