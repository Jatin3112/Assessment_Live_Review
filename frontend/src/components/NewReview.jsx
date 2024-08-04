import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/ReviewForm.css"; // Import the common CSS file

function NewReview() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/reviews", { title, content });
      navigate("/");
    } catch (error) {
      setError("Failed to add review");
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="review-form-container">
      <h1 className="review-form-heading">Add New Review</h1>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default NewReview;
