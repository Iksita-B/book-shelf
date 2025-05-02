import React, { useState } from 'react';
import './AddBook.css';
import axios from 'axios';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [reaction, setReaction] = useState('');
  const [finishedDate, setFinishedDate] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Book title is required';
    if (!author.trim()) newErrors.author = 'Author name is required';
    if (!genre) newErrors.genre = 'Genre is required';
    if (!status) newErrors.status = 'Status is required';
    if (status === 'Read' && !finishedDate) newErrors.finishedDate = 'Finished date is required';
    return newErrors;
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const newBook = {
        title,
        author,
        genre,
        status,
        description,
        reaction
      };
  
      // Add startDate if status is "Reading"
      if (status === 'Reading') {
        newBook.startDate = new Date().toISOString(); // sets current date
      }
  
      // Add endDate if status is "Read"
      if (status === 'Read' && finishedDate) {
        newBook.endDate = new Date(finishedDate).toISOString();
      }      
  
      try {
        await axios.post('http://localhost:5000/api/books', newBook);
        alert('Book added successfully!');
        
        // Clear form after submission
        setTitle('');
        setAuthor('');
        setGenre('');
        setStatus('');
        setDescription('');
        setReaction('');
        setFinishedDate('');
        setErrors({});
      } catch (error) {
        console.error('Error adding book:', error);
        alert('Failed to add book. Please try again.');
      }
    }
  };  

  // Back button handler to go to the previous page
  const handleBackButton = () => {
    window.history.back();
  };

  return (
    <div className="add-book-container">
      <button onClick={handleBackButton} className="back-button">
        &#8592; Back to Book Shelf
      </button>
      
      <h2>Add a New Book 📚</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Book Title*</label>
          <input 
            type="text" 
            placeholder="Enter book title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label>Author*</label>
          <input 
            type="text" 
            placeholder="Enter author name" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required 
          />
          {errors.author && <p className="error">{errors.author}</p>}
        </div>

        <div className="form-group">
          <label>Genre*</label>
          <select 
            value={genre} 
            onChange={(e) => setGenre(e.target.value)} 
            required
          >
            <option value="">--Select Genre--</option>
            <option value="Fiction">Fiction</option>
            <option value="NonFiction">NonFiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Romance">Romance</option>
            <option value="Fantasy">Fantasy</option>
          </select>
          {errors.genre && <p className="error">{errors.genre}</p>}
        </div>

        <div className="form-group">
          <label>Status*</label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            required
          >
            <option value="">Select Status</option>
            <option value="Need to Read">Need to Read</option>
            <option value="Reading">Reading</option>
            <option value="Read">Read</option>
          </select>
          {errors.status && <p className="error">{errors.status}</p>}
        </div>

        {status === 'Read' && (
          <div className="form-group">
            <label>Finished Date*</label>
            <input 
              type="date" 
              value={finishedDate} 
              onChange={(e) => setFinishedDate(e.target.value)} 
            />
            {errors.finishedDate && <p className="error">{errors.finishedDate}</p>}
          </div>
        )}
        
        <div className="form-group">
          <label>Description</label>
          <textarea 
            placeholder="Write a short description about the book" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>

        <div className="form-group">
            <label>Reaction</label>
            <div className="emoji-dropdown-container">
              <button
                type="button"
                className="selected-emoji"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                {reaction || '😀'}
              </button>

              {showEmojiPicker && (
                <div className="emoji-dropdown">              
                  {['😍', '🙂', '😐', '😞', '🤯', '😭', '😂'].map((emo) => (
                    <button
                      key={emo}
                      type="button"
                      className={ emo === reaction ? "emoji-option-selected": "emoji-option"}
                      onClick={() => {
                        setReaction(emo);
                        setShowEmojiPicker(false);
                      }}
                    >
                      {emo}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>


        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
