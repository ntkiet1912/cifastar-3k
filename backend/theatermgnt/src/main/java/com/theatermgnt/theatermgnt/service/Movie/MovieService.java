package com.theatermgnt.theatermgnt.service.Movie;

import com.theatermgnt.theatermgnt.dto.Movie.request.CreateMovieRequest;
import com.theatermgnt.theatermgnt.dto.Movie.request.UpdateMovieRequest;
import com.theatermgnt.theatermgnt.dto.Movie.response.MovieResponse;
import com.theatermgnt.theatermgnt.dto.Movie.response.MovieSimpleResponse;
import com.theatermgnt.theatermgnt.entity.Movie.AgeRating;
import com.theatermgnt.theatermgnt.entity.Movie.Genre;
import com.theatermgnt.theatermgnt.entity.Movie.Movie;
import com.theatermgnt.theatermgnt.exception.ResourceNotFoundException;
import com.theatermgnt.theatermgnt.mapper.MovieMapper;
import com.theatermgnt.theatermgnt.repository.Movie.AgeRatingRepository;
import com.theatermgnt.theatermgnt.repository.Movie.GenreRepository;
import com.theatermgnt.theatermgnt.repository.Movie.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MovieService {

    private final MovieRepository movieRepository;
    private final AgeRatingRepository ageRatingRepository;
    private final GenreRepository genreRepository;
    private final MovieMapper movieMapper;

    // ========== CREATE ==========

    @Transactional
    public MovieResponse createMovie(CreateMovieRequest request) {
        // Map request to entity
        Movie movie = movieMapper.toEntity(request);
        movie.setId(UUID.randomUUID().toString());

        // Set AgeRating
        AgeRating ageRating = ageRatingRepository.findById(request.getAgeRatingId())
                .orElseThrow(() -> new ResourceNotFoundException("AgeRating", "id", request.getAgeRatingId()));
        movie.setAgeRating(ageRating);

        // Set Genres
        Set<Genre> genres = request.getGenreIds().stream()
                .map(id -> genreRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Genre", "id", id)))
                .collect(Collectors.toSet());
        movie.setGenres(genres);

        // Save and return response
        Movie savedMovie = movieRepository.save(movie);
        return movieMapper.toResponse(savedMovie);
    }

    // ========== READ ==========

    public List<MovieSimpleResponse> getAllMovies() {
        return movieRepository.findAll().stream()
                .map(movieMapper::toSimpleResponse)
                .collect(Collectors.toList());
    }

    public MovieResponse getMovieById(String id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie", "id", id));
        return movieMapper.toResponse(movie);
    }

    public List<MovieSimpleResponse> getMoviesByStatus(Movie.MovieStatus status) {
        return movieRepository.findByStatus(status).stream()
                .map(movieMapper::toSimpleResponse)
                .collect(Collectors.toList());
    }

    public List<MovieSimpleResponse> getNowShowingMovies() {
        return movieRepository.findNowShowingMovies(LocalDate.now()).stream()
                .map(movieMapper::toSimpleResponse)
                .collect(Collectors.toList());
    }

    public List<MovieSimpleResponse> getComingSoonMovies() {
        return movieRepository.findComingSoonMovies(LocalDate.now()).stream()
                .map(movieMapper::toSimpleResponse)
                .collect(Collectors.toList());
    }

    public List<MovieSimpleResponse> searchMoviesByTitle(String title) {
        return movieRepository.findByTitleContainingIgnoreCase(title).stream()
                .map(movieMapper::toSimpleResponse)
                .collect(Collectors.toList());
    }

    public List<MovieSimpleResponse> getMoviesByGenre(String genreId) {
        return movieRepository.findByGenreId(genreId).stream()
                .map(movieMapper::toSimpleResponse)
                .collect(Collectors.toList());
    }

    // ========== UPDATE ==========

    @Transactional
    public MovieResponse updateMovie(String id, UpdateMovieRequest request) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie", "id", id));

        // Update basic fields using MapStruct
        movieMapper.updateEntityFromRequest(request, movie);

        // Update AgeRating if provided
        if (request.getAgeRatingId() != null) {
            AgeRating ageRating = ageRatingRepository.findById(request.getAgeRatingId())
                    .orElseThrow(() -> new ResourceNotFoundException("AgeRating", "id", request.getAgeRatingId()));
            movie.setAgeRating(ageRating);
        }

        // Update Genres if provided
        if (request.getGenreIds() != null && !request.getGenreIds().isEmpty()) {
            Set<Genre> genres = request.getGenreIds().stream()
                    .map(genreId -> genreRepository.findById(genreId)
                            .orElseThrow(() -> new ResourceNotFoundException("Genre", "id", genreId)))
                    .collect(Collectors.toSet());
            movie.setGenres(genres);
        }

        Movie updatedMovie = movieRepository.save(movie);
        return movieMapper.toResponse(updatedMovie);
    }

    @Transactional
    public MovieResponse archiveMovie(String id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie", "id", id));
        movie.setStatus(Movie.MovieStatus.archived);
        Movie archivedMovie = movieRepository.save(movie);
        return movieMapper.toResponse(archivedMovie);
    }

    // ========== DELETE ==========

    @Transactional
    public void deleteMovie(String id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie", "id", id));
        movieRepository.delete(movie);
    }
}