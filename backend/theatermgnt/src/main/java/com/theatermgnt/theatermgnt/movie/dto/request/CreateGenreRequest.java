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
public class CreateGenreRequest {

    @NotBlank(message = "ID không được để trống")
    @Size(max = 50, message = "ID không được quá 50 ký tự")
    String id;

    @NotBlank(message = "Name không được để trống")
    @Size(max = 100, message = "Name không được quá 100 ký tự")
    String name;
}
