'use client';

import apiClient from '@/lib/apiClient';
import type { Genre, ApiResponse } from '@/types/movie';

const genreService = {
  getAllGenres: async (): Promise<Genre[]> => {
    const response: ApiResponse<Genre[]> = await apiClient.get('/api/genres');
    return response.data || [];
  },

  getGenreById: async (id: number): Promise<Genre> => {
    const response: ApiResponse<Genre> = await apiClient.get(`/api/genres/${id}`);
    return response.data;
  },
};

export default genreService;
