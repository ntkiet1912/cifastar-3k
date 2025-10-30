package com.theatermgnt.theatermgnt.dto.Movie.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AgeRatingResponse {
    private String id;
    private String code;
    private String description;
}