 import React, { useEffect } from 'react';
import BookReviewList from './components/BookReviewList';
import BookReviewForm from './components/BookReviewForm';
import EditReviewForm from './components/EditReviewForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  useEffect(() => {
    document.title = 'Book Review Application';
  }, []);  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BookReviewList />} />
          <Route path="/add" element={<BookReviewForm />} />
          <Route path="/edit/:id" element={<EditReviewForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
