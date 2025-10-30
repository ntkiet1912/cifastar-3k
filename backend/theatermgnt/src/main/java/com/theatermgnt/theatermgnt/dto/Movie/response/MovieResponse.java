package com.theatermgnt.theatermgnt.dto.Movie.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.theatermgnt.theatermgnt.entity.Movie.Movie;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MovieResponse {

    private String id;
    private String title;
    private String description;
    private Integer durationMinutes;
    private String director;
    private String cast;
    private String posterUrl;
    private String trailerUrl;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate releaseDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    private Movie.MovieStatus status;

    // Nested objects
    private AgeRatingInfo ageRating;
    private Set<GenreInfo> genres;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AgeRatingInfo {
        private String id;
        private String code;
        private String description;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GenreInfo {
        private String id;
        private String name;
    }
}