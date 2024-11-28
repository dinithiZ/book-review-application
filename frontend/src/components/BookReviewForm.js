import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookReviewForm() {
  useEffect(() => {
    document.title = 'Add a New Review';
  }, []); 

  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = { bookTitle, author, rating, reviewText };
    await axios.post('http://localhost:5000/reviews', newReview);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Book Title"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      />
      <textarea
        placeholder="Review Text"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <button type="submit" style={buttonStyle}>Add Review</button>
    </form>
  );
}

const buttonStyle = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#103154',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
};

 

export default BookReviewForm;
