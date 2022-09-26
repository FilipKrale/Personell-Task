import React from 'react';
import { useGlobalContext } from '../../context.';
import Pizza from "../PizzaList/Pizza";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./PizzaList.css";

//https://world.openfoodfacts.org/api/v0/product/3560070822508.json

function PizzaList() {
  const { pizzas, loading, resultTitle } = useGlobalContext();
  const pizzasWithCheese = pizzas.map((singlePizza) => {
    return {
      ...singlePizza,
      // removing /works/ to get only id
      id: (singlePizza.id).replace("/works/", ""),
      cover_img: singlePizza.cover_id ? `https://world.openfoodfacts.org/api/v0/product/3560070822508.json/b/id/${singlePizza.cover_id}-L.jpg` : coverImg
    };
  });

  if (loading)
    return <Loading />;

  return (
    <section className='pizzalist'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultTitle}</h2>
        </div>
        <div className='pizzalist-content grid'>
          {pizzasWithCheese.slice(0, 30).map((item, index) => {
            return (
              <Pizza key={index} {...item} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PizzaList