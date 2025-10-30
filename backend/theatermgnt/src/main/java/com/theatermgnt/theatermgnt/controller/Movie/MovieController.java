package com.theatermgnt.theatermgnt.controller.Movie;

import com.theatermgnt.theatermgnt.dto.Movie.request.CreateMovieRequest;
import com.theatermgnt.theatermgnt.dto.Movie.request.UpdateMovieRequest;
import com.theatermgnt.theatermgnt.dto.Movie.response.ApiResponse;
import com.theatermgnt.theatermgnt.dto.Movie.response.MovieResponse;
import com.theatermgnt.theatermgnt.dto.Movie.response.MovieSimpleResponse;
import com.theatermgnt.theatermgnt.entity.Movie.Movie;
import com.theatermgnt.theatermgnt.service.Movie.MovieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MovieController {

    private final MovieService movieService;

    // ========== CREATE ==========

    @PostMapping
    public ResponseEntity<ApiResponse<MovieResponse>> createMovie(
            @Valid @RequestBody CreateMovieRequest request) {
        MovieResponse response = movieService.createMovie(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Tạo phim thành công", response));
    }

    // ========== READ ==========

    @GetMapping
    public ResponseEntity<ApiResponse<List<MovieSimpleResponse>>> getAllMovies() {
        List<MovieSimpleResponse> movies = movieService.getAllMovies();
        return ResponseEntity.ok(ApiResponse.success(movies));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MovieResponse>> getMovieById(@PathVariable String id) {
        MovieResponse movie = movieService.getMovieById(id);
        return ResponseEntity.ok(ApiResponse.success(movie));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<MovieSimpleResponse>>> getMoviesByStatus(
            @PathVariable Movie.MovieStatus status) {
        List<MovieSimpleResponse> movies = movieService.getMoviesByStatus(status);
        return ResponseEntity.ok(ApiResponse.success(movies));
    }

    @GetMapping("/now-showing")
    public ResponseEntity<ApiResponse<List<MovieSimpleResponse>>> getNowShowingMovies() {
        List<MovieSimpleResponse> movies = movieService.getNowShowingMovies();
        return ResponseEntity.ok(ApiResponse.success(movies));
    }

    @GetMapping("/coming-soon")
    public ResponseEntity<ApiResponse<List<MovieSimpleResponse>>> getComingSoonMovies() {
        List<MovieSimpleResponse> movies = movieService.getComingSoonMovies();
        return ResponseEntity.ok(ApiResponse.success(movies));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<MovieSimpleResponse>>> searchMovies(
            @RequestParam String title) {
        List<MovieSimpleResponse> movies = movieService.searchMoviesByTitle(title);
        return ResponseEntity.ok(ApiResponse.success(movies));
    }

    @GetMapping("/genre/{genreId}")
    public ResponseEntity<ApiResponse<List<MovieSimpleResponse>>> getMoviesByGenre(
            @PathVariable String genreId) {
        List<MovieSimpleResponse> movies = movieService.getMoviesByGenre(genreId);
        return ResponseEntity.ok(ApiResponse.success(movies));
    }

    // ========== UPDATE ==========

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MovieResponse>> updateMovie(
            @PathVariable String id,
            @Valid @RequestBody UpdateMovieRequest request) {
        MovieResponse response = movieService.updateMovie(id, request);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật phim thành công", response));
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<ApiResponse<MovieResponse>> archiveMovie(@PathVariable String id) {
        MovieResponse response = movieService.archiveMovie(id);
        return ResponseEntity.ok(ApiResponse.success("Lưu trữ phim thành công", response));
    }

    // ========== DELETE ==========

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMovie(@PathVariable String id) {
        movieService.deleteMovie(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa phim thành công", null));
    }
}