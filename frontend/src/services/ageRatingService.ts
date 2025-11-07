'use client';

import apiClient from '@/lib/apiClient';
import type { AgeRating, ApiResponse } from '@/types/movie';

const ageRatingService = {
  getAllAgeRatings: async (): Promise<AgeRating[]> => {
    const response: ApiResponse<AgeRating[]> = await apiClient.get('/api/age-ratings');
    return response.data || [];
  },

  getAgeRatingById: async (id: number): Promise<AgeRating> => {
    const response: ApiResponse<AgeRating> = await apiClient.get(`/api/age-ratings/${id}`);
    return response.data;
  },
};

export default ageRatingService;
