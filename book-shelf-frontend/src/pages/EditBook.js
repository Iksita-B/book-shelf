import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditBook.css';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    status: '',
    reaction: '',
    description: '',
    endDate: ''
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(res => {
        const data = res.data;
        const formattedDate = data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : '';
        setBookData({ ...data, endDate: formattedDate });
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch book details.');
      });
  }, [id]);
  

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, author, genre, status } = bookData;
  
    if (!title || !author || !genre || !status) {
      setError('Please fill in all required fields.');
      return;
    }
  
    const updatedBookData = {
      ...bookData,
      endDate: status === "Read" ? bookData.endDate : ""
    };
  
    try {
      await axios.put(`http://localhost:5000/api/books/${id}`, updatedBookData);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Error updating the book.');
    }
  };  

  const handleEmojiSelect = (emoji) => {
    setBookData({ ...bookData, reaction: emoji });
    setShowEmojiPicker(false);
  };

  return (
    <div className="edit-book-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Book Shelf
      </button>

      <h2>Edit Book 📚</h2>
      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Book Title*</label>
          <input type="text" name="title" value={bookData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Author*</label>
          <input type="text" name="author" value={bookData.author} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Genre*</label>
          <select name="genre" value={bookData.genre} onChange={handleChange} required>
            <option value="">--Select Genre--</option>
            <option value="Fiction">Fiction</option>
            <option value="NonFiction">NonFiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Romance">Romance</option>
            <option value="Fantasy">Fantasy</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status*</label>
          <select name="status" value={bookData.status} onChange={handleChange} required>
            <option value="">--Select Status--</option>
            <option value="Need to Read">Need to Read</option>
            <option value="Reading">Reading</option>
            <option value="Read">Read</option>
          </select>
        </div>

        {bookData.status === "Read" && (
          <div className="form-group">
            <label>Finished Date</label>
            <input
              type="date"
              name="endDate"
              value={bookData.endDate}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Reaction</label>
          <div className="emoji-dropdown-container">
            <button type="button" className="selected-emoji" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              {bookData.reaction || '😀'}
            </button>

            {showEmojiPicker && (
              <div className="emoji-dropdown">
                {['😍', '🙂', '😐', '😞', '🤯', '😭', '😂'].map((emo) => (
                  <button
                    key={emo}
                    type="button"
                    className={emo === bookData.reaction ? "emoji-option-selected" : "emoji-option"}
                    onClick={() => handleEmojiSelect(emo)}
                  >
                    {emo}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditBook;
