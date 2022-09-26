import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./PizzaDetails.css";
import {FaArrowLeft} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const URL = "https://world.openfoodfacts.org/api/v0/product/3560070822508.json";

const PizzaDetails = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [pizza, setPizza] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getPizzaDetails(){
      try{
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();
        console.log(data);

        if(data){
          const {description, brand, covers, subject_places, subject_times, subjects} = data;
          const newPizza = {
            description: description ? description.value : "No description found",
            brand: brand,
            cover_img: covers ? `https://world.openfoodfacts.org/api/v0/product/3560070822508.json/id/${covers[0]}-L.jpg` : coverImg,
            subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
            subject_times : subject_times ? subject_times.join(", ") : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found"
          };
          setPizza(newPizza);
        } else {
          setPizza(null);
        }
        setLoading(false);
      } catch(error){
        console.log(error);
        setLoading(false);
      }
    }
    getPizzaDetails();
  }, [id]);

  if(loading) return <Loading />;

  return (
    <section className='pizza-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/pizza")}>
          <FaArrowLeft size = {22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        <div className='pizza-details-content grid'>
          <div className='pizza-details-img'>
            <img src = {pizza?.cover_img} alt = "cover img" />
          </div>
          <div className='pizza-details-info'>
            <div className='pizza-details-item title'>
              <span className='fw-6 fs-24'>{pizza?.title}</span>
            </div>
            <div className='pizza-details-item description'>
              <span>{pizza?.description}</span>
            </div>
            <div className='pizza-details-item'>
              <span className='fw-6'>Subject Places: </span>
              <span className='text-italic'>{pizza?.subject_places}</span>
            </div>
            <div className='pizza-details-item'>
              <span className='fw-6'>Subject Times: </span>
              <span className='text-italic'>{pizza?.subject_times}</span>
            </div>
            <div className='pizza-details-item'>
              <span className='fw-6'>Subjects: </span>
              <span>{pizza?.subjects}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PizzaDetails