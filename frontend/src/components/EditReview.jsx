import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/ReviewForm.css"; // Import the common CSS file

function EditReview() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getReview = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/reviews/${id}`
        );
        const review = response.data.review;
        setTitle(review.title);
        setContent(review.content);
      } catch (error) {
        console.error("Error fetching review:", error);
        setError("Failed to fetch review data");
      }
    };

    getReview();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/reviews/${id}`, {
        title,
        content,
      });
      navigate("/");
    } catch (error) {
      setError("Failed to update review");
      console.error("Error updating review:", error);
    }
  };

  return (
    <div className="review-form-container">
      <h1 className="review-form-heading">Edit Review</h1>
      <form onSubmit={handleSubmit} className="review-form">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Update Review</button>
      </form>
    </div>
  );
}

export default EditReview;
