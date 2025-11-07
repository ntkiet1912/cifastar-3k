'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Film, Trash2, Edit, Archive } from 'lucide-react';
import type { Movie } from '@/types/movie';
import { formatDate, formatDuration } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
  onEdit?: (movie: Movie) => void;
  onDelete?: (id: number) => void;
  onArchive?: (id: number) => void;
}

export function MovieCard({ movie, onEdit, onDelete, onArchive }: MovieCardProps) {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      NOW_SHOWING: 'bg-green-500/10 text-green-500 border-green-500/20',
      COMING_SOON: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      ARCHIVED: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
    };
    return styles[status] || styles.ARCHIVED;
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/20 to-primary/5">
            <Film className="w-20 h-20 text-muted-foreground/30" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(movie.status)}`}>
            {movie.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      <CardHeader className="space-y-2">
        <CardTitle className="line-clamp-1">{movie.title}</CardTitle>
        <CardDescription className="line-clamp-2">{movie.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Genres */}
        {movie.genres && movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        {/* Movie Info */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(movie.duration)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(movie.releaseDate)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Rating: {movie.ageRating?.name || 'N/A'}</span>
            <span className="text-xs bg-muted px-2 py-1 rounded">{movie.language}</span>
          </div>
        </div>

        {/* Director & Cast */}
        <div className="text-xs space-y-1 pt-2 border-t">
          <p><span className="font-medium">Đạo diễn:</span> {movie.director}</p>
          <p className="line-clamp-1"><span className="font-medium">Diễn viên:</span> {movie.cast}</p>
        </div>
      </CardContent>

      <CardFooter className="gap-2 pt-0">
        {onEdit && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(movie)}
            className="flex-1"
          >
            <Edit className="w-4 h-4 mr-1" />
            Sửa
          </Button>
        )}
        {onArchive && movie.status !== 'ARCHIVED' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onArchive(movie.id)}
            className="flex-1"
          >
            <Archive className="w-4 h-4 mr-1" />
            Lưu trữ
          </Button>
        )}
        {onDelete && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(movie.id)}
            className="flex-1"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Xóa
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}