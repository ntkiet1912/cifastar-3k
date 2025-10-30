package com.theatermgnt.theatermgnt.service.Movie;

import com.theatermgnt.theatermgnt.dto.Movie.request.CreateAgeRatingRequest;
import com.theatermgnt.theatermgnt.dto.Movie.response.AgeRatingResponse;
import com.theatermgnt.theatermgnt.entity.Movie.AgeRating;
import com.theatermgnt.theatermgnt.exception.ResourceNotFoundException;
import com.theatermgnt.theatermgnt.mapper.AgeRatingMapper;
import com.theatermgnt.theatermgnt.repository.Movie.AgeRatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AgeRatingService {

    private final AgeRatingRepository ageRatingRepository;
    private final AgeRatingMapper ageRatingMapper;

    // CREATE
    @Transactional
    public AgeRatingResponse createAgeRating(CreateAgeRatingRequest request) {
        AgeRating ageRating = new AgeRating();
        ageRating.setId(request.getId());
        ageRating.setCode(request.getCode());
        ageRating.setDescription(request.getDescription());

        AgeRating savedAgeRating = ageRatingRepository.save(ageRating);
        return ageRatingMapper.toResponse(savedAgeRating);
    }

    // READ
    public List<AgeRatingResponse> getAllAgeRatings() {
        List<AgeRating> ageRatings = ageRatingRepository.findAll();
        return ageRatingMapper.toResponseList(ageRatings);
    }

    public AgeRatingResponse getAgeRatingById(String id) {
        AgeRating ageRating = ageRatingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AgeRating", "id", id));
        return ageRatingMapper.toResponse(ageRating);
    }

    public AgeRatingResponse getAgeRatingByCode(String code) {
        AgeRating ageRating = ageRatingRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("AgeRating", "code", code));
        return ageRatingMapper.toResponse(ageRating);
    }
}