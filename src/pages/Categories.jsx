import React from 'react';
import { Container, Category} from '../components';

function Categories() {
  const categories = [
    { title: 'Technology', featuredImage: 'Technology' },
    { title: 'Health', featuredImage: 'Health' },
    { title: 'Travel', featuredImage: 'Travel' },
    { title: 'Education', featuredImage: 'Education' },
    { title: 'Lifestyle', featuredImage: 'Lifestyle' },
    { title: 'Food', featuredImage: 'Food' },
  ];

  return (
    <div className="py-8 w-full">
      <Container>
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="break-inside-avoid mb-4 bg-white shadow-lg rounded-lg overflow-hidden">
              <Category title={category.title} featuredImage={category.featuredImage} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Categories;
