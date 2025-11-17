package com.theatermgnt.theatermgnt.movie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.theatermgnt.theatermgnt.movie.entity.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, String> {

    List<Movie> findByStatus(Movie.MovieStatus status);

    @Query("SELECT m FROM Movie m WHERE m.status = 'now_showing' ")
    List<Movie> findNowShowingMovies();

    @Query("SELECT m FROM Movie m WHERE m.status = 'coming_soon'")
    List<Movie> findComingSoonMovies();

    @Query("SELECT DISTINCT m FROM Movie m LEFT JOIN FETCH m.genres LEFT JOIN FETCH m.ageRating")
    List<Movie> findAllWithGenres();

    List<Movie> findByTitleContainingIgnoreCase(String title);

    @Query("SELECT m FROM Movie m JOIN m.genres g WHERE g.id = ?1")
    List<Movie> findByGenreId(String genreId);

    List<Movie> findByDirectorContainingIgnoreCase(String director);
}
