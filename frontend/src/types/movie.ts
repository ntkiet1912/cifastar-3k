// Types matching backend API structure

export interface Genre {
  id: number;
  name: string;
}

export interface AgeRating {
  id: number;
  name: string;
  description: string;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  duration: number; // in minutes
  releaseDate: string; // ISO date string
  endDate?: string | null;
  director: string;
  cast: string;
  trailerUrl?: string | null;
  posterUrl?: string | null;
  language: string;
  subtitles?: string | null;
  country: string;
  status: MovieStatus;
  genres: Genre[];
  ageRating: AgeRating;
}

export enum MovieStatus {
  NOW_SHOWING = 'NOW_SHOWING',
  COMING_SOON = 'COMING_SOON',
  ARCHIVED = 'ARCHIVED'
}

export interface CreateMovieRequest {
  title: string;
  description: string;
  duration: number;
  releaseDate: string;
  endDate?: string | null;
  director: string;
  cast: string;
  trailerUrl?: string | null;
  posterUrl?: string | null;
  language: string;
  subtitles?: string | null;
  country: string;
  genreIds: number[];
  ageRatingId: number;
}

export interface UpdateMovieRequest extends CreateMovieRequest {}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}
