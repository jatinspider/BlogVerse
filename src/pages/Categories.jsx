import React from 'react';
import { Container, Category } from '../components';

function Categories() {
  const categories = [
    { title: 'Technology', featuredImage: 'Technology' },
    { title: 'Health', featuredImage: 'Health' },
    { title: 'Travel', featuredImage: 'Travel' },
    { title: 'Education', featuredImage: 'Education' },
    { title: 'Lifestyle', featuredImage: 'Lifestyle' },
    { title: 'Food', featuredImage: 'Food' },
    { title: 'Entertainment', featuredImage: 'Entertainment' },
  ];

  return (
    <div className="py-8 w-full bg-gray-50">
      <Container>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Category title={category.title} featuredImage={category.featuredImage} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Categories;
