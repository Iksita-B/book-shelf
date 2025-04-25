import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../Components/BookCard';
import FilterBar from '../Components/FilterBar';
import Masonry from 'react-masonry-css';
import '../App.css';

function Home() {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ genre: '', status: '', reaction: '' });
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };

  const handleDelete = (deletedId) => {
    setBooks(prevBooks => prevBooks.filter(book => book._id !== deletedId));
  };  

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredBooks = books.filter(book => {
    return (
      (filters.genre === '' || book.genre === filters.genre) &&
      (filters.status === '' || book.status === filters.status) &&
      (filters.reaction === '' || book.reaction === filters.reaction) &&
      (search === '' || book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="home-container">
      <h2>My Book Shelf 📚</h2>

      <FilterBar filters={filters} setFilters={setFilters} />

      <div className="add-search">
        <button
          onClick={() => navigate('/add')}
          style={{
            backgroundColor: '#4c9a2a',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            width: 'fit-content'
          }}
        >
          ➕ Add Book
        </button>
        <input value={search} className="search-books" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
      </div>

      <Masonry breakpointCols={breakpoints} className="masonry-grid" columnClassName="masonry-column">
        {filteredBooks.map(book => (
            <BookCard key={book._id} book={book} onDelete={handleDelete}/>
          ))}
      </Masonry>
    </div>
  );
}

export default Home;
