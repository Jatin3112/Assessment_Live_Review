import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/Reviews.css"; // Import the CSS file

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [snackbar, setSnackbar] = useState(null);
  const [deletedReview, setDeletedReview] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reviews");
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    getReviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/reviews/${id}`
      );
      setDeletedReview(response.data.review);

      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== id)
      );
      setSnackbar({
        message: "Review deleted successfully",
      });
      setTimeout(() => setSnackbar(null), 5000);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleUndoDelete = async () => {
    if (!deletedReview) return;
    console.log("Ssaissass");
    try {
      await axios.post(`http://localhost:5000/api/reviews`, deletedReview);
      setReviews((prevReviews) => [...prevReviews, deletedReview]);
      setSnackbar(null);
    } catch (error) {
      console.error("Error undoing delete:", error);
    }
  };

  const sortReviews = (reviews, criteria, order) => {
    return [...reviews].sort((a, b) => {
      if (criteria === "title") {
        return order === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else {
        return order === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  };

  const filteredReviews = reviews.filter(
    (review) =>
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="reviews-container">
      <h1>Reviews</h1>

      <Link to="/new" className="create-review">
        Create New Review
      </Link>
      <div className="search-container">
        <h2>Search Reviews</h2>
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="sorting-controls">
        <label htmlFor="sortCriteria">Sort by:</label>
        <select
          id="sortCriteria"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="createdAt">Date-time</option>
          <option value="title">Title</option>
        </select>
        <label htmlFor="sortOrder">Order:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <table className="reviews-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Content</th>
            <th>Date-time</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortReviews(filteredReviews, sortCriteria, sortOrder).map(
            (review, index) => (
              <tr key={review._id}>
                <td>{index + 1}</td>
                <td>{review.title}</td>
                <td>{review.content}</td>
                <td>{new Date(review.createdAt).toLocaleString()}</td>
                <td>
                  <Link to={`/${review._id}`} className="edit-review">Edit</Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(review._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {snackbar && (
        <div className="snackbar">
          {snackbar.message}
          <button onClick={handleUndoDelete}>Undo</button>
        </div>
      )}
    </div>
  );
}

export default Reviews;
