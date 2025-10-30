package com.theatermgnt.theatermgnt.controller.Movie;

import com.theatermgnt.theatermgnt.dto.Movie.request.CreateAgeRatingRequest;
import com.theatermgnt.theatermgnt.dto.Movie.response.AgeRatingResponse;
import com.theatermgnt.theatermgnt.dto.Movie.response.ApiResponse;
import com.theatermgnt.theatermgnt.service.Movie.AgeRatingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/age-ratings")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AgeRatingController {

    private final AgeRatingService ageRatingService;

    @PostMapping
    public ResponseEntity<ApiResponse<AgeRatingResponse>> createAgeRating(
            @Valid @RequestBody CreateAgeRatingRequest request) {
        AgeRatingResponse response = ageRatingService.createAgeRating(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Tạo phân loại tuổi thành công", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AgeRatingResponse>>> getAllAgeRatings() {
        List<AgeRatingResponse> ageRatings = ageRatingService.getAllAgeRatings();
        return ResponseEntity.ok(ApiResponse.success(ageRatings));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AgeRatingResponse>> getAgeRatingById(@PathVariable String id) {
        AgeRatingResponse ageRating = ageRatingService.getAgeRatingById(id);
        return ResponseEntity.ok(ApiResponse.success(ageRating));
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<ApiResponse<AgeRatingResponse>> getAgeRatingByCode(@PathVariable String code) {
        AgeRatingResponse ageRating = ageRatingService.getAgeRatingByCode(code);
        return ResponseEntity.ok(ApiResponse.success(ageRating));
    }
}
