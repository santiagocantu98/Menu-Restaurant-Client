import React from 'react';
import { Col, Row, Rate } from 'antd';

import ProductMedia from '../ProductMedia';

const getCalificationAverage = (califications) => {
  let average = 0;
  califications.forEach(({rating}) => average += rating);
  return Math.round((average/califications.length)*2)/2;
}

const ProductView = ({
  product = false,
  position,
  text_color,
  product_color_inverse,
  rating_color,
  waiter,
}) => {
  if (waiter) {
    const { name, last_name, role, image_url, califications } = waiter;

    return (
      <Row type="flex" style={position && {
        backgroundColor: product_color_inverse
      }} className={`product ${position && 'right'}`} justify="space-between">
        {!position ? (<>
          <Col xs={24} md={12}>
            <img
              className="product-img"
              src={image_url}
              alt={image_url}
              style={{maxHeight: '360px'}}
            />
          </Col>
          <Col className="product-description" xs={24} md={12}>
            <h2
              style={{
                color: text_color,
              }}
            >{`${name} ${last_name}`}</h2>
            <h4
              style={{
                color: text_color,
              }}
            >{role}</h4>
            <Rate style={{ color: rating_color }} disabled allowHalf defaultValue={getCalificationAverage(califications)} />
          </Col>
        </>)
          : (
            <>
              <Col className="product-description" xs={24} md={12}>
                <h2
                  style={{
                    color: text_color,
                  }}
                >{`${name} ${last_name}`}</h2>
                <h4
                  style={{
                    color: text_color,
                  }}
                >{role}</h4>
                <Rate style={{ color: rating_color }} disabled allowHalf defaultValue={getCalificationAverage(califications)} />
              </Col>
              <Col xs={24} md={12}>
                <img
                  className="product-img"
                  src={image_url}
                  alt={image_url}
                  style={{maxHeight: '360px'}}
                />
              </Col>
            </>
          )}
      </Row>
    )
  }
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
          <Rate style={{ color: rating_color }} disabled allowHalf defaultValue={Math.round(rating*2)/2} />
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
              <Rate style={{ color: rating_color }} disabled allowHalf defaultValue={Math.round(rating*2)/2} />
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
