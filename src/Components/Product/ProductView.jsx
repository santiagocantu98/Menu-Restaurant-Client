import React from 'react';
import { Col, Row, Rate } from 'antd';

import ProductMedia from '../ProductMedia';

const ProductView = ({ product, position, text_color, product_color_inverse, rating_color, }) => {
  const { name, description, price, rating, media_files } = product;
  return (
    <Row type="flex" style={position && {
      backgroundColor: product_color_inverse
    }} className={`product ${position && 'right'}`} justify="space-between">
      {!position ? (<>
        <Col xs={24} md={12}>
          <ProductMedia media={media_files} />
        </Col>
        <Col className="product-description" xs={24} md={12}>
          <h2
            style={{
              color: text_color,
            }}
          >{name}</h2>
          <h4
            style={{
              color: text_color,
            }}
          >{description}</h4>
          <Rate style={{ color: rating_color }} disabled allowHalf defaultValue={rating} />
          <h3
            style={{
              color: text_color,
            }}
          >${price}</h3>
        </Col>
      </>)
        : (
          <>
            <Col className="product-description" xs={24} md={12}>
              <h2
                style={{
                  color: text_color,
                }}
              >{name}</h2>
              <h4
                style={{
                  color: text_color,
                }}
              >{description}</h4>
              <Rate style={{ color: rating_color }} disabled allowHalf defaultValue={rating} />
              <h3
                style={{
                  color: text_color,
                }}
              >${price}</h3>
            </Col>
            <Col xs={24} md={12}>
              <ProductMedia media={media_files} />
            </Col>
          </>
        )}
    </Row>
  )
}

export default ProductView;
