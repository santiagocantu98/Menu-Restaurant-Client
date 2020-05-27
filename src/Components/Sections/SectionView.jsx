import React from 'react';

import Product from '../Product';


const sortProducts = (a, b) => {
  if (Number(a.position) > Number(b.position)) {
    return 1;
  } else if (Number(a.position) < Number(b.position)) {
    return -1;
  } else {
    return 0;
  }
};

const SectionView = ({
  section = false,
  text_color,
  product_color_inverse,
  rating_color,
  waiters = false,
}) => {
  console.log(waiters)
  if (waiters) {
    return (
      <div>
        <h2
          style={{
            color: text_color,
          }}
          className="section">
          Nuestro Equipo
        </h2>
        {(waiters && waiters.length > 0) ? waiters.map((waiter, i) => (
          <Product
            rating_color={rating_color}
            text_color={text_color}
            product_color_inverse={product_color_inverse}
            position={i % 2}
            waiter={waiter}
          />
        )) :
          (<h2
            style={{
              color: text_color,
            }}
            className="section">
            El restaurante no cuenta con empleados registrados.
          </h2>)
        }
      </div>
    );
  }
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
      {(products && products.length > 0) ? products.sort(sortProducts).map((product, i) => (
        <Product
          rating_color={rating_color}
          text_color={text_color}
          product_color_inverse={product_color_inverse}
          product={product} position={i % 2}
        />
      )) :
        (<h2
          style={{
            color: text_color,
          }}
          className="section">
          Esta seccion no cuenta con productos.
        </h2>)
      }
    </div>
  )
}

export default SectionView;
