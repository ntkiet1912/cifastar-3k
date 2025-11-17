package com.theatermgnt.theatermgnt.movie.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateAgeRatingRequest {

    @NotBlank(message = "ID không được để trống")
    @Size(max = 50, message = "ID không được quá 50 ký tự")
    String id;

    @NotBlank(message = "Code không được để trống")
    @Size(min = 1, max = 10, message = "Code phải từ 1-10 ký tự")
    String code;

    @NotBlank(message = "Description không được để trống")
    @Size(max = 500, message = "Description không được quá 500 ký tự")
    String description;
}
