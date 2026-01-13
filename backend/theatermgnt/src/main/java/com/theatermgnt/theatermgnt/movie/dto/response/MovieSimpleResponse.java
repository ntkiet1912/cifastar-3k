package com.theatermgnt.theatermgnt.movie.dto.response;

import java.time.LocalDate;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.theatermgnt.theatermgnt.common.enums.MovieStatus;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MovieSimpleResponse {

    String id;
    String title;
    String posterUrl;
    Integer durationMinutes;

    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate releaseDate;

    MovieStatus status;
    String ageRatingCode;
    String director;
    Set<GenreInfo> genres;
    Boolean needsArchiveWarning;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class GenreInfo {
        String id;
        String name;
    }
}
