package com.theatermgnt.theatermgnt.service.Movie;

import com.theatermgnt.theatermgnt.dto.Movie.request.CreateGenreRequest;
import com.theatermgnt.theatermgnt.dto.Movie.response.GenreResponse;
import com.theatermgnt.theatermgnt.entity.Movie.Genre;
import com.theatermgnt.theatermgnt.exception.ResourceNotFoundException;
import com.theatermgnt.theatermgnt.mapper.GenreMapper;
import com.theatermgnt.theatermgnt.repository.Movie.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GenreService {

    private final GenreRepository genreRepository;
    private final GenreMapper genreMapper;

    // CREATE
    @Transactional
    public GenreResponse createGenre(CreateGenreRequest request) {
        Genre genre = new Genre();
        genre.setId(request.getId());
        genre.setName(request.getName());
        genre.setMovies(new HashSet<>());

        Genre savedGenre = genreRepository.save(genre);
        return genreMapper.toResponse(savedGenre);
    }

    // READ
    public List<GenreResponse> getAllGenres() {
        List<Genre> genres = genreRepository.findAll();
        return genreMapper.toResponseList(genres);
    }

    public GenreResponse getGenreById(String id) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Genre", "id", id));
        return genreMapper.toResponse(genre);
    }

    public GenreResponse getGenreByName(String name) {
        Genre genre = genreRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Genre", "name", name));
        return genreMapper.toResponse(genre);
    }
}