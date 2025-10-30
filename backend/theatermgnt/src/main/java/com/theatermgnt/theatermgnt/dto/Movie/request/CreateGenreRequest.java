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
public class CreateGenreRequest {

    @NotBlank(message = "ID không được để trống")
    @Size(max = 50, message = "ID không được quá 50 ký tự")
    private String id;

    @NotBlank(message = "Name không được để trống")
    @Size(max = 100, message = "Name không được quá 100 ký tự")
    private String name;
}