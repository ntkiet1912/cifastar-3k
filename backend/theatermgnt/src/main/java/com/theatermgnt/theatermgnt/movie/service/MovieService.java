package com.theatermgnt.theatermgnt.movie.service;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.theatermgnt.theatermgnt.common.exception.ResourceNotFoundException;
import com.theatermgnt.theatermgnt.movie.dto.request.CreateMovieRequest;
import com.theatermgnt.theatermgnt.movie.dto.request.UpdateMovieRequest;
import com.theatermgnt.theatermgnt.movie.dto.response.MovieResponse;
import com.theatermgnt.theatermgnt.movie.dto.response.MovieSimpleResponse;
import com.theatermgnt.theatermgnt.movie.entity.AgeRating;
import com.theatermgnt.theatermgnt.movie.entity.Genre;
import com.theatermgnt.theatermgnt.movie.entity.Movie;
import com.theatermgnt.theatermgnt.movie.mapper.MovieMapper;
import com.theatermgnt.theatermgnt.movie.repository.AgeRatingRepository;
import com.theatermgnt.theatermgnt.movie.repository.GenreRepository;
import com.theatermgnt.theatermgnt.movie.repository.MovieRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MovieService {

    MovieRepository movieRepository;
    AgeRatingRepository ageRatingRepository;
    GenreRepository genreRepository;
    MovieMapper movieMapper;

    public MovieResponse createMovie(CreateMovieRequest request) {

        Movie movie = movieMapper.toMovie(request);
        movie.setId(UUID.randomUUID().toString());

        // Set AgeRating
        AgeRating ageRating = ageRatingRepository
                .findById(request.getAgeRatingId())
                .orElseThrow(() -> new ResourceNotFoundException("AgeRating", "id", request.getAgeRatingId()));
        movie.setAgeRating(ageRating);

        // Set Genres
        Set<Genre> genres = request.getGenreIds().stream()
                .map(id -> genreRepository
                        .findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Genre", "id", id)))
                .collect(Collectors.toSet());
        movie.setGenres(genres);

        // Save and return response
        Movie savedMovie = movieRepository.save(movie);
        return movieMapper.toMovieResponse(savedMovie);
    }

    // ========== READ ==========

    public List<MovieSimpleResponse> getAllMovies() {
        try {
            System.out.println("🔍 [DEBUG] Starting getAllMovies...");

            List<Movie> movies = movieRepository.findAllWithGenres();
            System.out.println("✅ [DEBUG] Found " + movies.size() + " movies from DB");

            // Debug từng movie
            for (int i = 0; i < movies.size(); i++) {
                Movie movie = movies.get(i);
                System.out.println("\n📽️ [DEBUG] Movie #" + (i + 1) + ":");
                System.out.println("   - ID: " + movie.getId());
                System.out.println("   - Title: " + movie.getTitle());
                System.out.println("   - Status: " + movie.getStatus());
                System.out.println("   - AgeRating: " + movie.getAgeRating());
                System.out.println("   - AgeRating Code: "
                        + (movie.getAgeRating() != null ? movie.getAgeRating().getCode() : "NULL"));
                System.out.println("   - Genres: " + movie.getGenres());
                System.out.println("   - Genres size: "
                        + (movie.getGenres() != null ? movie.getGenres().size() : "NULL"));
            }

            System.out.println("\n🔄 [DEBUG] Starting mapping process...");
            List<MovieSimpleResponse> responses = movies.stream()
                    .map(movie -> {
                        System.out.println("   Mapping: " + movie.getTitle());
                        MovieSimpleResponse response = movieMapper.toMovieSimpleResponse(movie);
                        System.out.println("   ✓ Mapped successfully");
                        return response;
                    })
                    .collect(Collectors.toList());

            System.out.println("✅ [DEBUG] Successfully mapped to " + responses.size() + " responses");
            return responses;

        } catch (Exception e) {
            System.err.println("❌ [ERROR] Exception in getAllMovies:");
            System.err.println("   Message: " + e.getMessage());
            System.err.println("   Class: " + e.getClass().getName());
            e.printStackTrace();
            throw e;
        }
    }

    public MovieResponse getMovieById(String id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Movie", "id", id));
        return movieMapper.toMovieResponse(movie);
    }

    public List<MovieSimpleResponse> getMoviesByStatus(Movie.MovieStatus status) {
        return movieRepository.findByStatus(status).stream()
                .map(movieMapper::toMovieSimpleResponse)
                .collect(Collectors.toList());
    }

    public List<MovieSimpleResponse> getNowShowingMovies() {
        return movieRepository.findNowShowingMovies().stream()
                .map(movieMapper::toMovieSimpleResponse)
                .collect(Collectors.toList());
    }

    public List<MovieSimpleResponse> getComingSoonMovies() {
        return movieRepository.findComingSoonMovies().stream()
                .map(movieMapper::toMovieSimpleResponse)
                .collect(Collectors.toList());
    }

    public List<MovieSimpleResponse> searchMoviesByTitle(String title) {
        return movieRepository.findByTitleContainingIgnoreCase(title).stream()
                .map(movieMapper::toMovieSimpleResponse)
                .collect(Collectors.toList());
    }

    public List<MovieSimpleResponse> getMoviesByGenre(String genreId) {
        return movieRepository.findByGenreId(genreId).stream()
                .map(movieMapper::toMovieSimpleResponse)
                .collect(Collectors.toList());
    }

    // ========== UPDATE ==========

    public MovieResponse updateMovie(String id, UpdateMovieRequest request) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Movie", "id", id));

        // Update basic fields using MapStruct
        movieMapper.updateMovieFromRequest(request, movie);

        // Update AgeRating if provided
        if (request.getAgeRatingId() != null) {
            AgeRating ageRating = ageRatingRepository
                    .findById(request.getAgeRatingId())
                    .orElseThrow(() -> new ResourceNotFoundException("AgeRating", "id", request.getAgeRatingId()));
            movie.setAgeRating(ageRating);
        }

        // Update Genres if provided
        if (request.getGenreIds() != null && !request.getGenreIds().isEmpty()) {
            Set<Genre> genres = request.getGenreIds().stream()
                    .map(genreId -> genreRepository
                            .findById(genreId)
                            .orElseThrow(() -> new ResourceNotFoundException("Genre", "id", genreId)))
                    .collect(Collectors.toSet());
            movie.setGenres(genres);
        }

        Movie updatedMovie = movieRepository.save(movie);
        return movieMapper.toMovieResponse(updatedMovie);
    }

    public MovieResponse archiveMovie(String id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Movie", "id", id));
        movie.setStatus(Movie.MovieStatus.archived);
        Movie archivedMovie = movieRepository.save(movie);
        return movieMapper.toMovieResponse(archivedMovie);
    }

    // ========== DELETE ==========

    public void deleteMovie(String movieId) {
        movieRepository.deleteById(movieId);
    }
}
