'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Movie, CreateMovieRequest, Genre, AgeRating } from '@/types/movie';
import genreService from '@/services/genreService';
import ageRatingService from '@/services/ageRatingService';

interface MovieFormProps {
  movie?: Movie | null;
  onSubmit: (data: CreateMovieRequest) => Promise<void>;
  onCancel: () => void;
}

export function MovieForm({ movie, onSubmit, onCancel }: MovieFormProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [ageRatings, setAgeRatings] = useState<AgeRating[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateMovieRequest>({
    title: '',
    description: '',
    duration: 0,
    releaseDate: '',
    endDate: null,
    director: '',
    cast: '',
    trailerUrl: null,
    posterUrl: null,
    language: 'Vietnamese',
    subtitles: null,
    country: 'Vietnam',
    genreIds: [],
    ageRatingId: 0,
  });

  useEffect(() => {
    loadGenresAndRatings();
    if (movie) {
      setFormData({
        title: movie.title,
        description: movie.description,
        duration: movie.duration,
        releaseDate: movie.releaseDate.split('T')[0],
        endDate: movie.endDate ? movie.endDate.split('T')[0] : null,
        director: movie.director,
        cast: movie.cast,
        trailerUrl: movie.trailerUrl,
        posterUrl: movie.posterUrl,
        language: movie.language,
        subtitles: movie.subtitles,
        country: movie.country,
        genreIds: movie.genres.map(g => g.id),
        ageRatingId: movie.ageRating.id,
      });
    }
  }, [movie]);

  const loadGenresAndRatings = async () => {
    try {
      const [genresData, ratingsData] = await Promise.all([
        genreService.getAllGenres(),
        ageRatingService.getAllAgeRatings(),
      ]);
      setGenres(genresData);
      setAgeRatings(ratingsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? null : value,
    }));
  };

  const handleGenreToggle = (genreId: number) => {
    setFormData(prev => ({
      ...prev,
      genreIds: prev.genreIds.includes(genreId)
        ? prev.genreIds.filter(id => id !== genreId)
        : [...prev.genreIds, genreId],
    }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{movie ? 'Chỉnh sửa phim' : 'Thêm phim mới'}</CardTitle>
        <CardDescription>
          {movie ? 'Cập nhật thông tin phim' : 'Nhập thông tin phim mới'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tên phim *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Nhập tên phim"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Thời lượng (phút) *</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                required
                placeholder="120"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả *</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Mô tả nội dung phim"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="releaseDate">Ngày khởi chiếu *</Label>
              <Input
                id="releaseDate"
                name="releaseDate"
                type="date"
                value={formData.releaseDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Ngày kết thúc</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Credits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="director">Đạo diễn *</Label>
              <Input
                id="director"
                name="director"
                value={formData.director}
                onChange={handleChange}
                required
                placeholder="Tên đạo diễn"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cast">Diễn viên *</Label>
              <Input
                id="cast"
                name="cast"
                value={formData.cast}
                onChange={handleChange}
                required
                placeholder="Danh sách diễn viên (phân cách bằng dấu phẩy)"
              />
            </div>
          </div>

          {/* Media */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="posterUrl">URL Poster</Label>
              <Input
                id="posterUrl"
                name="posterUrl"
                value={formData.posterUrl || ''}
                onChange={handleChange}
                placeholder="https://example.com/poster.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trailerUrl">URL Trailer</Label>
              <Input
                id="trailerUrl"
                name="trailerUrl"
                value={formData.trailerUrl || ''}
                onChange={handleChange}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>

          {/* Language & Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Ngôn ngữ *</Label>
              <Input
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                placeholder="Vietnamese"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitles">Phụ đề</Label>
              <Input
                id="subtitles"
                name="subtitles"
                value={formData.subtitles || ''}
                onChange={handleChange}
                placeholder="English, Vietnamese"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Quốc gia *</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                placeholder="Vietnam"
              />
            </div>
          </div>

          {/* Genres */}
          <div className="space-y-2">
            <Label>Thể loại *</Label>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  type="button"
                  onClick={() => handleGenreToggle(genre.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    formData.genreIds.includes(genre.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          {/* Age Rating */}
          <div className="space-y-2">
            <Label htmlFor="ageRatingId">Phân loại độ tuổi *</Label>
            <select
              id="ageRatingId"
              name="ageRatingId"
              value={formData.ageRatingId}
              onChange={handleChange}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value={0}>Chọn phân loại độ tuổi</option>
              {ageRatings.map((rating) => (
                <option key={rating.id} value={rating.id}>
                  {rating.name} - {rating.description}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Đang xử lý...' : movie ? 'Cập nhật' : 'Thêm phim'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
