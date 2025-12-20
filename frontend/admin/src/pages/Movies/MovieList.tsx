import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SearchAddBar } from "@/components/ui/SearchAddBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { MovieTable } from "@/components/movies/MovieTable";
import { MovieFormDialog } from "@/components/movies/MovieFormDialog";
import { useMovieManager } from "@/hooks/useMovieManager";
import { getMovieById } from "@/services/movieService";
import type { Movie, MovieSimple, CreateMovieRequest } from "@/types/MovieType/Movie";
import { Search, X, Film } from "lucide-react";
import { useNotificationStore } from "@/stores";

export function MovieList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [filteredMovies, setFilteredMovies] = useState<MovieSimple[]>([]);
  const [loadingMovie, setLoadingMovie] = useState(false);

  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const {
    movies,
    loading,
    saving,
    confirmDialog,
    loadData,
    handleCreateMovie,
    handleUpdateMovie,
    handleDeleteMovie,
    closeConfirmDialog,
  } = useMovieManager();

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Filter movies based on search query (client-side filtering)
  useEffect(() => {
    if (!Array.isArray(movies)) {
      setFilteredMovies([]);
      return;
    }

    if (!searchQuery.trim()) {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) => {
        try {
          if (!movie) return false;

          const title = (movie.title || "").toLowerCase();
          const director = (movie.director || "").toLowerCase();
          const query = searchQuery.toLowerCase();

          return title.includes(query) || director.includes(query);
        } catch (error) {
          console.error("Error filtering movie:", movie, error);
          return false;
        }
      });
      setFilteredMovies(filtered);
    }
  }, [movies, searchQuery]);

  const handleOpenCreateDialog = () => {
    setSelectedMovie(null);
    setDialogOpen(true);
  };

  const handleOpenEditDialog = async (movie: MovieSimple) => {
    try {
      setLoadingMovie(true);
      // Load full movie details for editing
      const fullMovie = await getMovieById(movie.id);
      setSelectedMovie(fullMovie);
      setDialogOpen(true);
    } catch (error: any) {
      addNotification({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to load movie details",
      });
    } finally {
      setLoadingMovie(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedMovie(null);
  };

  const handleSubmit = async (request: CreateMovieRequest) => {
    if (selectedMovie) {
      return await handleUpdateMovie(selectedMovie.id, request);
    } else {
      return await handleCreateMovie(request);
    }
  };

  const handleDelete = (movie: MovieSimple) => {
    handleDeleteMovie(movie.id, movie.title);
  };

  if (loading) {
    return <LoadingSpinner message="Loading movies..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Movies Management"
        description="Manage all movies in the system"
      />

      {/* Search and Actions Bar */}
      <SearchAddBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search by movie title or director..."
        totalCount={movies.length}
        filteredCount={filteredMovies.length}
        icon={<Film className="w-4 h-4" />}
        label="movies"
        buttonText="Add Movie"
        onAddClick={handleOpenCreateDialog}
      />

      {/* Movie Table */}
      {searchQuery.trim() && filteredMovies.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Search className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No movies found
          </h3>
          <p className="text-muted-foreground mb-4">
            No movies match your search for "{searchQuery}"
          </p>
          <Button
            variant="outline"
            onClick={() => setSearchQuery("")}
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Clear search
          </Button>
        </div>
      ) : (
        <MovieTable
          movies={filteredMovies}
          isLoading={loading}
          onEdit={handleOpenEditDialog}
          onDelete={handleDelete}
          updatingCell={saving || loadingMovie ? "updating" : undefined}
        />
      )}

      {/* Movie Form Dialog */}
      <MovieFormDialog
        isOpen={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        movie={selectedMovie}
        saving={saving}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={closeConfirmDialog}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        description={confirmDialog.description}
        confirmText={confirmDialog.confirmText || "Confirm"}
        cancelText="Cancel"
        variant={confirmDialog.variant || "destructive"}
      />
    </div>
  );
}
