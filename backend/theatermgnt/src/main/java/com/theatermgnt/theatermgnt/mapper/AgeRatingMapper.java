package com.theatermgnt.theatermgnt.mapper;

import com.theatermgnt.theatermgnt.dto.Movie.response.AgeRatingResponse;
import com.theatermgnt.theatermgnt.entity.Movie.AgeRating;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface AgeRatingMapper {

    /**
     * Convert AgeRating entity to AgeRatingResponse
     */
    AgeRatingResponse toResponse(AgeRating ageRating);

    /**
     * Convert List<AgeRating> to List<AgeRatingResponse>
     */
    List<AgeRatingResponse> toResponseList(List<AgeRating> ageRatings);
}
