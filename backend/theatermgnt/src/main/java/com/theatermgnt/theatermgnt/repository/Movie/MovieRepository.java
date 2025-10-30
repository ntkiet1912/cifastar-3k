package com.theatermgnt.theatermgnt.repository.Movie;


import com.theatermgnt.theatermgnt.entity.Movie.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, String> {

    List<Movie> findByStatus(Movie.MovieStatus status);

    @Query("SELECT m FROM Movie m WHERE m.status = 'now_showing' AND m.releaseDate <= ?1 AND (m.endDate IS NULL OR m.endDate >= ?1)")
    List<Movie> findNowShowingMovies(LocalDate currentDate);

    @Query("SELECT m FROM Movie m WHERE m.status = 'coming_soon' AND m.releaseDate > ?1")
    List<Movie> findComingSoonMovies(LocalDate currentDate);

    List<Movie> findByTitleContainingIgnoreCase(String title);

    @Query("SELECT m FROM Movie m JOIN m.genres g WHERE g.id = ?1")
    List<Movie> findByGenreId(String genreId);

    List<Movie> findByDirectorContainingIgnoreCase(String director);
}
