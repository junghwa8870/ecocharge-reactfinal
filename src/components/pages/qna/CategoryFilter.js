import React from 'react';

const CategoryFilter = ({ categories, category, setCatecory }) => {
  return (
    <div className='category-filter'>
      {categories.map((cat) => (
        <button
          key={cat.value}
          className={`category-button ${category === cat.value ? 'active' : ''}`}
          onClick={() => setCatecory(cat.value)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
