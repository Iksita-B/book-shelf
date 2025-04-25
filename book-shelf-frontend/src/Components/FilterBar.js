import React from 'react';

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClear = () => {
    setFilters({
      genre: '',
      status: '',
      reaction: '',
    });
  };

  return (
    <div className="filter-bar">
      <select name="genre" value={filters.genre} onChange={handleChange}>
        <option value="">All Genres</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Romance">Romance</option>
        <option value="Non-fiction">Non-fiction</option>
        <option value="Mystery">Mystery</option>
      </select>

      <select name="status" value={filters.status} onChange={handleChange}>
        <option value="">All Statuses</option>
        <option value="Need to Read">📘 Need to Read</option>
        <option value="Reading">📖 Reading</option>
        <option value="Read">✅ Read</option>
      </select>

      <select name="reaction" value={filters.reaction} onChange={handleChange}>
        <option value="">All Reactions</option>
        <option value="😍">😍 Loved it</option>
        <option value="🙂">🙂 Liked it</option>
        <option value="😐">😐 It was okay</option>
        <option value="😞">😞 Didn't enjoy</option>
        <option value="🤯">🤯 Mind-blowing</option>
        <option value="😭">😭 Heartbreaking</option>
        <option value="😂">😂 Hilarious</option>
      </select>

      <button onClick={handleClear}>Clear Filters</button>
    </div>
  );
};

export default FilterBar;
