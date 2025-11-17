package com.theatermgnt.theatermgnt.movie.service;

import java.util.HashSet;
import java.util.List;

import org.springframework.stereotype.Service;

import com.theatermgnt.theatermgnt.common.exception.ResourceNotFoundException;
import com.theatermgnt.theatermgnt.movie.dto.request.CreateGenreRequest;
import com.theatermgnt.theatermgnt.movie.dto.response.GenreResponse;
import com.theatermgnt.theatermgnt.movie.entity.Genre;
import com.theatermgnt.theatermgnt.movie.mapper.GenreMapper;
import com.theatermgnt.theatermgnt.movie.repository.GenreRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GenreService {

    GenreRepository genreRepository;
    GenreMapper genreMapper;

    // CREATE
    public GenreResponse createGenre(CreateGenreRequest request) {
        Genre genre = new Genre();
        genre.setId(request.getId());
        genre.setName(request.getName());
        genre.setMovies(new HashSet<>());

        Genre savedGenre = genreRepository.save(genre);
        return genreMapper.toGenreResponse(savedGenre);
    }

    // READ
    public List<GenreResponse> getAllGenres() {
        List<Genre> genres = genreRepository.findAll();
        return genreMapper.toGenreResponseList(genres);
    }

    public GenreResponse getGenreById(String id) {
        Genre genre = genreRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Genre", "id", id));
        return genreMapper.toGenreResponse(genre);
    }

    public GenreResponse getGenreByName(String name) {
        Genre genre = genreRepository
                .findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Genre", "name", name));
        return genreMapper.toGenreResponse(genre);
    }
}
