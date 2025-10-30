package com.theatermgnt.theatermgnt.controller.Movie;

import com.theatermgnt.theatermgnt.dto.Movie.request.CreateGenreRequest;
import com.theatermgnt.theatermgnt.dto.Movie.response.ApiResponse;
import com.theatermgnt.theatermgnt.dto.Movie.response.GenreResponse;
import com.theatermgnt.theatermgnt.service.Movie.GenreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GenreController {

    private final GenreService genreService;

    @PostMapping
    public ResponseEntity<ApiResponse<GenreResponse>> createGenre(
            @Valid @RequestBody CreateGenreRequest request) {
        GenreResponse response = genreService.createGenre(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Tạo thể loại thành công", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<GenreResponse>>> getAllGenres() {
        List<GenreResponse> genres = genreService.getAllGenres();
        return ResponseEntity.ok(ApiResponse.success(genres));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GenreResponse>> getGenreById(@PathVariable String id) {
        GenreResponse genre = genreService.getGenreById(id);
        return ResponseEntity.ok(ApiResponse.success(genre));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<ApiResponse<GenreResponse>> getGenreByName(@PathVariable String name) {
        GenreResponse genre = genreService.getGenreByName(name);
        return ResponseEntity.ok(ApiResponse.success(genre));
    }
}