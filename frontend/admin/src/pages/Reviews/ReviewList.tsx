import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star, Trash2, Search, MessageSquare, Film } from "lucide-react";
import { getReviewsByMovieId, deleteReview } from "@/services/reviewService";
import { getAllMovies } from "@/services/movieService";
import type { MovieReview } from "@/types/review";
import type { MovieSimple } from "@/types/MovieType/Movie";
import { format } from "date-fns";
import { toast } from "sonner";

export function ReviewList() {
  const [movies, setMovies] = useState<MovieSimple[]>([]);
  const [reviews, setReviews] = useState<MovieReview[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<MovieReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<string>("");
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    reviewId: "",
    reviewTitle: "",
  });

  // Load movies on mount
  useEffect(() => {
    loadMovies();
  }, []);

  // Load reviews when movie is selected
  useEffect(() => {
    if (selectedMovie) {
      loadReviews(selectedMovie);
    } else {
      setReviews([]);
      setFilteredReviews([]);
    }
  }, [selectedMovie]);

  const loadMovies = async () => {
    try {
      setLoadingMovies(true);
      const data = await getAllMovies();
      setMovies(data);
    } catch (error) {
      console.error("Failed to load movies:", error);
      toast.error("Failed to load movies");
    } finally {
      setLoadingMovies(false);
    }
  };

  const loadReviews = async (movieId: string) => {
    try {
      setLoading(true);
      const data = await getReviewsByMovieId(movieId);
      setReviews(data);
      setFilteredReviews(data);
    } catch (error) {
      console.error("Failed to load reviews:", error);
      toast.error("Failed to load reviews");
      setReviews([]);
      setFilteredReviews([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter reviews based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter((review) => {
        const customerName = `${review.customer.firstName} ${review.customer.lastName}`.toLowerCase();
        const movieTitle = review.movie.title.toLowerCase();
        const comment = (review.comment || "").toLowerCase();
        const query = searchQuery.toLowerCase();

        return (
          customerName.includes(query) ||
          movieTitle.includes(query) ||
          comment.includes(query)
        );
      });
      setFilteredReviews(filtered);
    }
  }, [reviews, searchQuery]);

  const handleDeleteClick = (review: MovieReview) => {
    setConfirmDialog({
      isOpen: true,
      reviewId: review.id,
      reviewTitle: `Review by ${review.customer.firstName} ${review.customer.lastName} for ${review.movie.title}`,
    });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteReview(confirmDialog.reviewId);
      toast.success("Review deleted successfully");
      if (selectedMovie) {
        loadReviews(selectedMovie);
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
      toast.error("Failed to delete review");
    } finally {
      setConfirmDialog({ isOpen: false, reviewId: "", reviewTitle: "" });
    }
  };

  const handleCloseDialog = () => {
    setConfirmDialog({ isOpen: false, reviewId: "", reviewTitle: "" });
  };

  if (loadingMovies) {
    return <LoadingSpinner message="Loading movies..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reviews Management"
        description="Manage all movie reviews in the system"
      />

      {/* Movie Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Film className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedMovie} onValueChange={setSelectedMovie}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select a movie to view reviews" />
            </SelectTrigger>
            <SelectContent>
              {movies.map((movie) => (
                <SelectItem key={movie.id} value={movie.id}>
                  {movie.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedMovie && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedMovie("")}
          >
            Clear
          </Button>
        )}
      </div>

      {/* Search Bar */}
      {selectedMovie && (
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer or comment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>
              {filteredReviews.length} of {reviews.length} reviews
            </span>
          </div>
        </div>
      )}

      {/* Reviews Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Movie</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Helpful</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!selectedMovie ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <Film className="h-12 w-12 text-muted-foreground" />
                    <p className="text-lg font-medium">Select a movie</p>
                    <p className="text-muted-foreground">
                      Choose a movie from the dropdown above to view its reviews
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <span>Loading reviews...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredReviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <MessageSquare className="h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {searchQuery
                        ? "No reviews match your search"
                        : "No reviews yet for this movie"}
                    </p>
                    {searchQuery && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchQuery("")}
                      >
                        Clear search
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="font-medium">
                      {review.customer.firstName} {review.customer.lastName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{review.movie.title}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{review.rating}</span>
                      <span className="text-muted-foreground">/10</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-md truncate">
                      {review.comment || (
                        <span className="text-muted-foreground italic">
                          No comment
                        </span>
                      )}
                    </div>
                    {review.isSpoiler && (
                      <Badge variant="destructive" className="mt-1">
                        Spoiler
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-sm">
                      <span className="text-green-600">
                        👍 {review.helpfulCount}
                      </span>
                      <span className="text-red-600">
                        👎 {review.unhelpfulCount}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(review.createdAt), "MMM dd, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(review)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Delete Review"
        description={`Are you sure you want to delete this review: "${confirmDialog.reviewTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}
