package com.theatermgnt.theatermgnt.movie.dto.request;

import java.time.LocalDate;
import java.util.Set;

import jakarta.validation.constraints.*;

import com.theatermgnt.theatermgnt.movie.entity.Movie;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateMovieRequest {

    @Size(max = 255, message = "Title không được quá 255 ký tự")
    String title;

    @Size(max = 5000, message = "Description không được quá 5000 ký tự")
    String description;

    @Min(value = 1, message = "Duration phải lớn hơn 0")
    @Max(value = 500, message = "Duration không được quá 500 phút")
    Integer durationMinutes;

    @Size(max = 255, message = "Director không được quá 255 ký tự")
    String director;

    @Size(max = 2000, message = "Cast không được quá 2000 ký tự")
    String cast;

    @Pattern(regexp = "^https?://.*", message = "Poster URL phải là URL hợp lệ")
    String posterUrl;

    @Pattern(regexp = "^https?://.*", message = "Trailer URL phải là URL hợp lệ")
    String trailerUrl;

    LocalDate releaseDate;
    LocalDate endDate;
    String ageRatingId;
    Movie.MovieStatus status;

    @Size(min = 1, max = 10, message = "Phải có từ 1 đến 10 thể loại")
    Set<String> genreIds;
}
