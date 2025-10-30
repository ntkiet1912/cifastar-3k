package com.theatermgnt.theatermgnt.mapper;


import com.theatermgnt.theatermgnt.dto.Movie.request.CreateMovieRequest;
import com.theatermgnt.theatermgnt.dto.Movie.request.UpdateMovieRequest;
import com.theatermgnt.theatermgnt.dto.Movie.response.MovieResponse;
import com.theatermgnt.theatermgnt.dto.Movie.response.MovieSimpleResponse;
import com.theatermgnt.theatermgnt.entity.Movie.AgeRating;
import com.theatermgnt.theatermgnt.entity.Movie.Genre;
import com.theatermgnt.theatermgnt.entity.Movie.Movie;
import org.mapstruct.*;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface MovieMapper {

    // ========== REQUEST TO ENTITY ==========

    /**
     * Convert CreateMovieRequest to Movie entity
     * Bỏ qua mapping của ageRating và genres vì cần custom logic
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ageRating", ignore = true)
    @Mapping(target = "genres", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Movie toEntity(CreateMovieRequest request);

    /**
     * Update Movie entity từ UpdateMovieRequest
     * Chỉ update những field không null
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "ageRating", ignore = true)
    @Mapping(target = "genres", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromRequest(UpdateMovieRequest request, @MappingTarget Movie movie);

    // ========== ENTITY TO RESPONSE ==========

    /**
     * Convert Movie entity to MovieResponse (full details)
     */
    @Mapping(source = "ageRating", target = "ageRating")
    @Mapping(source = "genres", target = "genres")
    MovieResponse toResponse(Movie movie);

    /**
     * Convert Movie entity to MovieSimpleResponse (for list view)
     */
    @Mapping(source = "ageRating.code", target = "ageRatingCode")
    MovieSimpleResponse toSimpleResponse(Movie movie);

    // ========== NESTED OBJECT MAPPING ==========

    /**
     * Map AgeRating entity to nested AgeRatingInfo
     */
    MovieResponse.AgeRatingInfo toAgeRatingInfo(AgeRating ageRating);

    /**
     * Map Genre entity to nested GenreInfo
     */
    MovieResponse.GenreInfo toGenreInfo(Genre genre);

    /**
     * Map Set<Genre> to Set<GenreInfo>
     */
    default Set<MovieResponse.GenreInfo> mapGenres(Set<Genre> genres) {
        if (genres == null) {
            return null;
        }
        return genres.stream()
                .map(this::toGenreInfo)
                .collect(Collectors.toSet());
    }
}