import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Reviews } from "./components";

function App() {
  // const [reviews, setReviews] = useState([]);

  // useEffect(() => {
  //   // Fetch initial reviews
  //   const fetchReviews = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/reviews");
  //       setReviews(response.data.reviews);
  //     } catch (error) {
  //       console.error("Error fetching reviews:", error);
  //     }
  //   };

  //   fetchReviews();
  // }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/reviews/${id}`);
  //     setReviews((prevReviews) =>
  //       prevReviews.filter((review) => review._id !== id)
  //     );
  //   } catch (error) {
  //     console.error("Error deleting review:", error);
  //   }
  // };

  return (
    <>
      <Reviews />
    </>
  );
}

export default App;
