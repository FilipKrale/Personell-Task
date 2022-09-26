import React from 'react';
import { Link } from 'react-router-dom';
import "./PizzaList.css";

const Pizza = (pizza) => {
  return (
    <div className='pizza-item flex flex-column flex-sb'>
      <div className='pizza-item-img'>
        <img src = {pizza.cover_img} alt = "cover" />
      </div>
      <div className='pizza-item-info text-center'>
        <Link to = {`/pizza/${pizza.id}`} {...pizza}>
          <div className='pizza-item-info-item title fw-7 fs-18'>
            <span>{pizza.title}</span>
          </div>
        </Link>

        <div className='pizza-item-info-item author fs-15'>
          <span className='text-capitalize fw-7'>Author: </span>
          <span>{pizza.author.join(", ")}</span>
        </div>

        <div className='pizza-item-info-item edition-count fs-15'>
          <span className='text-capitalize fw-7'>Total Editions: </span>
          <span>{pizza.edition_count}</span>
        </div>

        <div className='pizza-item-info-item publish-year fs-15'>
          <span className='text-capitalize fw-7'>First Publish Year: </span>
          <span>{pizza.first_publish_year}</span>
        </div>
      </div>
    </div>
  )
}

export default Pizza