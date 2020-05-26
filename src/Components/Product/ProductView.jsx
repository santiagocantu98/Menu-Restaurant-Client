import React, { useState } from 'react';
import { Col, Row, Rate } from 'antd';
import ReactPlayer from 'react-player'

const ProductView = ({ product, position, text_color, product_color_inverse, rating_color, video_url }) => {
  const [display, setDisplay] = useState(false);
  const { name, description, price, rating, image_url } = product;
  return (
    <Row type="flex" style={position && {
      backgroundColor: product_color_inverse
    }} className={`product ${position && 'right'}`} justify="space-between">
      {!position ? (<>
        <Col xs={24} md={12}>
          {(image_url && video_url) ? (
            <>
              {display ? (
                <ReactPlayer
                  url={video_url}
                  controls
                />
              ) :
                <img className="product-img" src={image_url} alt={name} />
              }
              <button className="arrow" onClick={() => setDisplay(!display)} style={{ color: text_color }}>
                {'<'}
              </button>
              <button className="arrow" onClick={() => setDisplay(!display)} style={{ color: text_color }}>
                {'>'}
              </button>
            </>
          ) : (
              <>
                {image_url && <img className="product-img" src={image_url} alt={name} />}
                {video_url && <ReactPlayer
                  url={video_url}
                  controls
                />}
              </>
            )}
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
              {(image_url && video_url) ? (
                <>
                  {display ? (
                    <ReactPlayer
                      url={video_url}
                      controls
                    />
                  ) :
                    <img className="product-img" src={image_url} alt={name} />
                  }
                  <button className="arrow" onClick={() => setDisplay(!display)} style={{ color: text_color }}>
                    {'<'}
                  </button>
                  <button className="arrow" onClick={() => setDisplay(!display)} style={{ color: text_color }}>
                    {'>'}
                  </button>
                </>
              ) : (
                  <>
                    {image_url && <img className="product-img" src={image_url} alt={name} />}
                    {video_url && <ReactPlayer
                      url={video_url}
                      controls
                    />}
                  </>
                )}
            </Col>
          </>
        )}
    </Row>
  )
}

export default ProductView;
