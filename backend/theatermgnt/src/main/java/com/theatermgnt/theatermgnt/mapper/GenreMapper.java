package com.theatermgnt.theatermgnt.mapper;

import com.theatermgnt.theatermgnt.dto.Movie.response.GenreResponse;
import com.theatermgnt.theatermgnt.entity.Movie.Genre;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface GenreMapper {

    /**
     * Convert Genre entity to GenreResponse
     */
    @Mapping(target = "movieCount", expression = "java(genre.getMovies() != null ? genre.getMovies().size() : 0)")
    GenreResponse toResponse(Genre genre);

    /**
     * Convert List<Genre> to List<GenreResponse>
     */
    List<GenreResponse> toResponseList(List<Genre> genres);
}