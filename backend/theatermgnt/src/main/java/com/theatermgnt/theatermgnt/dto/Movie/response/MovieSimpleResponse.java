package com.theatermgnt.theatermgnt.dto.Movie.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.theatermgnt.theatermgnt.entity.Movie.Movie;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Response đơn giản cho danh sách phim
 * Chỉ chứa thông tin cần thiết để hiển thị trong list/card view
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MovieSimpleResponse {

    private String id;
    private String title;
    private String posterUrl;
    private Integer durationMinutes;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate releaseDate;

    private Movie.MovieStatus status;
    private String ageRatingCode;
    private String director;
}