package com.theatermgnt.theatermgnt.repository.Movie;

import com.theatermgnt.theatermgnt.entity.Movie.Genre;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface GenreRepository extends JpaRepository<Genre , String> {
    Optional<Genre> findByName(String name);
}
