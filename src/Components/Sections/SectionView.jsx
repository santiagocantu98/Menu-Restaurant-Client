import React from 'react';

import Product from '../Product';

const SectionView = ({ section, text_color, product_color_inverse, rating_color }) => {
  const {
    description,
    products,
  } = section;
  return (
    <div>
      <h2 
      style={{
        color: text_color,
      }}
      className="section">
        {description}
      </h2>
      {products.map((product, i) => (
        <Product rating_color={rating_color} text_color={text_color} product_color_inverse={product_color_inverse} product={product} position={i%2} />
      ))}
    </div>
  )
}

export default SectionView;
