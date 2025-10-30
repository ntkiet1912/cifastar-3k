package com.theatermgnt.theatermgnt.dto.Movie.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GenreResponse {
    private String id;
    private String name;
    private Integer movieCount; // Số lượng phim thuộc thể loại này (optional)
}