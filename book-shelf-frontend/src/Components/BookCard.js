import React from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookCard.css';

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate();

  const calculateDuration = (startDate, endDate) => {
    if (startDate && endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      return end.diff(start, 'days');
    }
    return null;
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${book.title}"?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/books/${book._id}`);
      alert(`"${book.title}" deleted successfully.`);
      if (onDelete) onDelete(book._id);
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete the book. Please try again.');
    }
  };

  const genreColors = {
    Fiction: 'lightblue',
    NonFiction: 'lightgreen',
    Mystery: 'lightcoral',
    Science: 'lightyellow',
    History: 'lightseagreen', 
    Romance: 'lightpink',
    Fantasy: 'lightgoldenrodyellow',
  };

  const genreColor = genreColors[book.genre] || 'lightgray';

  return (
    <div className="book-card" style={{ background: `${genreColor}` }}>
      <div className="heading">
        <h2>{book.title}</h2>
        <div className="edit-delete-buttons">
          <button className="edit-button" onClick={() => navigate(`/edit/${book._id}`)}>✎</button>
          <button className="delete-button" onClick={handleDelete}>🗑️</button>
        </div>
      </div>
      <p>{book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Status:</strong> {book.status}</p>
      <p><strong>Started:</strong> {dayjs(book.startDate).format('MMM D, YYYY')}</p>
      <p><strong>Finished:</strong> {book.endDate ? dayjs(book.endDate).format('MMM D, YYYY') : 'N/A'}</p>
      {book.startDate && book.endDate && (
        <p><strong>Duration:</strong> {calculateDuration(book.startDate, book.endDate)} days</p>
      )}
      <p className="reaction">{book.reaction}</p>
      <p><i>{book.description}</i></p>
    </div>
  );
};

export default BookCard;
