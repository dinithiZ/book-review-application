
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditReviewForm() {
  useEffect(() => {
    document.title = 'Edit Review';
  }, []); 
  const { id } = useParams();
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/reviews/${id}`)
      .then(response => {
        setBookTitle(response.data.bookTitle);
        setAuthor(response.data.author);
        setRating(response.data.rating);
        setReviewText(response.data.reviewText);
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedReview = { bookTitle, author, rating, reviewText };
    await axios.put(`http://localhost:5000/reviews/${id}`, updatedReview);
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
      <button type="submit" style={buttonStyle}>Update Review</button>
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

export default EditReviewForm;
