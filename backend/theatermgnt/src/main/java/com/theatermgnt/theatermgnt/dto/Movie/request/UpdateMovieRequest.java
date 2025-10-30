package com.theatermgnt.theatermgnt.dto.Movie.request;

import com.theatermgnt.theatermgnt.entity.Movie.Movie;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMovieRequest {

    @Size(max = 255, message = "Title không được quá 255 ký tự")
    private String title;

    @Size(max = 5000, message = "Description không được quá 5000 ký tự")
    private String description;

    @Min(value = 1, message = "Duration phải lớn hơn 0")
    @Max(value = 500, message = "Duration không được quá 500 phút")
    private Integer durationMinutes;

    @Size(max = 255, message = "Director không được quá 255 ký tự")
    private String director;

    @Size(max = 2000, message = "Cast không được quá 2000 ký tự")
    private String cast;

    @Pattern(regexp = "^https?://.*", message = "Poster URL phải là URL hợp lệ")
    private String posterUrl;

    @Pattern(regexp = "^https?://.*", message = "Trailer URL phải là URL hợp lệ")
    private String trailerUrl;

    private LocalDate releaseDate;
    private LocalDate endDate;
    private String ageRatingId;
    private Movie.MovieStatus status;

    @Size(min = 1, max = 10, message = "Phải có từ 1 đến 10 thể loại")
    private Set<String> genreIds;
}