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
public class CreateMovieRequest {

    @NotBlank(message = "Title không được để trống")
    @Size(max = 255, message = "Title không được quá 255 ký tự")
    private String title;

    @NotBlank(message = "Description không được để trống")
    @Size(max = 5000, message = "Description không được quá 5000 ký tự")
    private String description;

    @NotNull(message = "Duration không được để trống")
    @Min(value = 1, message = "Duration phải lớn hơn 0 phút")
    @Max(value = 500, message = "Duration không được quá 500 phút")
    private Integer durationMinutes;

    @NotBlank(message = "Director không được để trống")
    @Size(max = 255, message = "Director không được quá 255 ký tự")
    private String director;

    @Size(max = 2000, message = "Cast không được quá 2000 ký tự")
    private String cast;

    @Pattern(regexp = "^https?://.*", message = "Poster URL phải là URL hợp lệ")
    private String posterUrl;

    @Pattern(regexp = "^https?://.*", message = "Trailer URL phải là URL hợp lệ")
    private String trailerUrl;

    @NotNull(message = "Release date không được để trống")
    private LocalDate releaseDate;

    private LocalDate endDate;

    @NotBlank(message = "Age rating ID không được để trống")
    private String ageRatingId;

    @NotNull(message = "Status không được để trống")
    private Movie.MovieStatus status;

    @NotEmpty(message = "Phải có ít nhất 1 thể loại")
    @Size(min = 1, max = 10, message = "Phải có từ 1 đến 10 thể loại")
    private Set<String> genreIds;
}