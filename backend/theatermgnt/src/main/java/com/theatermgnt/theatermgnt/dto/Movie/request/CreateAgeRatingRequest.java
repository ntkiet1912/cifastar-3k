package com.theatermgnt.theatermgnt.dto.Movie.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateAgeRatingRequest {

    @NotBlank(message = "ID không được để trống")
    @Size(max = 50, message = "ID không được quá 50 ký tự")
    private String id;

    @NotBlank(message = "Code không được để trống")
    @Size(min = 1, max = 10, message = "Code phải từ 1-10 ký tự")
    private String code;

    @NotBlank(message = "Description không được để trống")
    @Size(max = 500, message = "Description không được quá 500 ký tự")
    private String description;
}