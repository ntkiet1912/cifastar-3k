'use client';

import apiClient from '@/lib/apiClient';
import type { Movie, CreateMovieRequest, UpdateMovieRequest, Genre, AgeRating, ApiResponse } from '@/types/movie';

const movieService = {
  // ========== CREATE ==========
  createMovie: async (movieData: CreateMovieRequest): Promise<ApiResponse<Movie>> => {
    return await apiClient.post('/api/movies', movieData);
  },

  // ========== READ ==========
  getAllMovies: async (): Promise<Movie[]> => {
    const response: ApiResponse<Movie[]> = await apiClient.get('/api/movies');
    return response.data || [];
  },

  getMovieById: async (id: number): Promise<Movie> => {
    const response: ApiResponse<Movie> = await apiClient.get(`/api/movies/${id}`);
    return response.data;
  },

  getNowShowingMovies: async (): Promise<Movie[]> => {
    const response: ApiResponse<Movie[]> = await apiClient.get('/api/movies/now-showing');
    return response.data || [];
  },

  getComingSoonMovies: async (): Promise<Movie[]> => {
    const response: ApiResponse<Movie[]> = await apiClient.get('/api/movies/coming-soon');
    return response.data || [];
  },

  getMoviesByStatus: async (status: string): Promise<Movie[]> => {
    const response: ApiResponse<Movie[]> = await apiClient.get(`/api/movies/status/${status}`);
    return response.data || [];
  },

  searchMovies: async (title: string): Promise<Movie[]> => {
    const response: ApiResponse<Movie[]> = await apiClient.get('/api/movies/search', {
      params: { title }
    });
    return response.data || [];
  },

  getMoviesByGenre: async (genreId: number): Promise<Movie[]> => {
    const response: ApiResponse<Movie[]> = await apiClient.get(`/api/movies/genre/${genreId}`);
    return response.data || [];
  },

  // ========== UPDATE ==========
  updateMovie: async (id: number, movieData: UpdateMovieRequest): Promise<ApiResponse<Movie>> => {
    return await apiClient.put(`/api/movies/${id}`, movieData);
  },

  archiveMovie: async (id: number): Promise<ApiResponse<string>> => {
    return await apiClient.patch(`/api/movies/${id}/archive`);
  },

  // ========== DELETE ==========
  deleteMovie: async (id: number): Promise<ApiResponse<string>> => {
    return await apiClient.delete(`/api/movies/${id}`);
  },
};

export default movieService;
