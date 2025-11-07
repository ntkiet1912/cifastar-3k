'use client';

import React, { useState, useEffect } from 'react';
import { MovieCard } from '@/components/MovieCard';
import { MovieForm } from '@/components/MovieForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Film, Loader2 } from 'lucide-react';
import movieService from '@/services/movieService';
import type { Movie, CreateMovieRequest } from '@/types/movie';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [movies, searchTerm, selectedStatus]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await movieService.getAllMovies();
      setMovies(data);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMovies = () => {
    let filtered = movies;

    // Filter by status
    if (selectedStatus !== 'ALL') {
      filtered = filtered.filter(movie => movie.status === selectedStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
  };

  const handleCreateMovie = async (data: CreateMovieRequest) => {
    try {
      await movieService.createMovie(data);
      setShowForm(false);
      loadMovies();
      alert('Thêm phim thành công!');
    } catch (error) {
      console.error('Error creating movie:', error);
    }
  };

  const handleUpdateMovie = async (data: CreateMovieRequest) => {
    if (!editingMovie) return;
    try {
      await movieService.updateMovie(editingMovie.id, data);
      setShowForm(false);
      setEditingMovie(null);
      loadMovies();
      alert('Cập nhật phim thành công!');
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const handleDeleteMovie = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa phim này?')) return;
    try {
      await movieService.deleteMovie(id);
      loadMovies();
      alert('Xóa phim thành công!');
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleArchiveMovie = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn lưu trữ phim này?')) return;
    try {
      await movieService.archiveMovie(id);
      loadMovies();
      alert('Lưu trữ phim thành công!');
    } catch (error) {
      console.error('Error archiving movie:', error);
    }
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingMovie(null);
  };

  if (showForm) {
    return (
      <div className="container mx-auto p-6">
        <MovieForm
          movie={editingMovie}
          onSubmit={editingMovie ? handleUpdateMovie : handleCreateMovie}
          onCancel={handleCancelForm}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý Phim</h1>
          <p className="text-muted-foreground">
            Quản lý danh sách phim trong hệ thống rạp chiếu
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Thêm phim mới
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Tìm kiếm phim theo tên, mô tả, đạo diễn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={selectedStatus === 'ALL' ? 'default' : 'outline'}
            onClick={() => setSelectedStatus('ALL')}
          >
            Tất cả
          </Button>
          <Button
            variant={selectedStatus === 'NOW_SHOWING' ? 'default' : 'outline'}
            onClick={() => setSelectedStatus('NOW_SHOWING')}
          >
            Đang chiếu
          </Button>
          <Button
            variant={selectedStatus === 'COMING_SOON' ? 'default' : 'outline'}
            onClick={() => setSelectedStatus('COMING_SOON')}
          >
            Sắp chiếu
          </Button>
          <Button
            variant={selectedStatus === 'ARCHIVED' ? 'default' : 'outline'}
            onClick={() => setSelectedStatus('ARCHIVED')}
          >
            Đã lưu trữ
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng số phim</p>
              <p className="text-2xl font-bold">{movies.length}</p>
            </div>
            <Film className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Đang chiếu</p>
              <p className="text-2xl font-bold text-green-500">
                {movies.filter(m => m.status === 'NOW_SHOWING').length}
              </p>
            </div>
            <Film className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Sắp chiếu</p>
              <p className="text-2xl font-bold text-blue-500">
                {movies.filter(m => m.status === 'COMING_SOON').length}
              </p>
            </div>
            <Film className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Đã lưu trữ</p>
              <p className="text-2xl font-bold text-gray-500">
                {movies.filter(m => m.status === 'ARCHIVED').length}
              </p>
            </div>
            <Film className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Movie Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Đang tải dữ liệu...</span>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="text-center py-20">
          <Film className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Không tìm thấy phim nào</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm
              ? 'Thử tìm kiếm với từ khóa khác'
              : 'Hãy thêm phim mới để bắt đầu'}
          </p>
          {!searchTerm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm phim đầu tiên
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onEdit={handleEdit}
              onDelete={handleDeleteMovie}
              onArchive={handleArchiveMovie}
            />
          ))}
        </div>
      )}
    </div>
  );
}
