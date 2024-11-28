import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookReviewList.css';


function BookReviewList() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filterRating, setFilterRating] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    axios
      .get('http://localhost:5000/reviews')
      .then((response) => {
        setReviews(response.data);
        setFilteredReviews(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteReview = async (id) => {
    await axios.delete(`http://localhost:5000/reviews/${id}`);
    const updatedReviews = reviews.filter((review) => review._id !== id);
    setReviews(updatedReviews);
    setFilteredReviews(updatedReviews);
  };

  const handleFilterRating = (rating) => {
    setFilterRating(rating);
    if (rating) {
      setFilteredReviews(reviews.filter((review) => review.rating === Number(rating)));
    } else {
      setFilteredReviews(reviews);
    }
  };

  const handleSortOrder = (order) => {
    setSortOrder(order);
    const sorted = [...filteredReviews].sort((a, b) =>
      order === 'asc'
        ? new Date(a.dateAdded) - new Date(b.dateAdded)
        : new Date(b.dateAdded) - new Date(a.dateAdded)
    );
    setFilteredReviews(sorted);
  };

  return (
    <div className="container">
      <h1 className="heading">Book Reviews</h1>
 
      <div className="controls">
        <select value={filterRating} onChange={(e) => handleFilterRating(e.target.value)} className="dropdown">
          <option value="">Filter by Rating</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <select value={sortOrder} onChange={(e) => handleSortOrder(e.target.value)} className="dropdown">
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
 
      <ul className="review-list">
        {filteredReviews.map((review) => (
          <li key={review._id} className="review-item">
            <h3>
              {review.bookTitle} by {review.author}
            </h3>
            <p>Rating: {review.rating}</p>
            <p>{review.reviewText}</p>
            <p>Added on: {new Date(review.dateAdded).toLocaleDateString()}</p>
            <div className="buttons">
              <Link to={`/edit/${review._id}`}>
                <button className="button">Edit</button>
              </Link>
              <button className="button" onClick={() => deleteReview(review._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Link to="/add">
        <button className="button add-button">Add New Review</button>
      </Link>
    </div>
  );
}

export default BookReviewList;
