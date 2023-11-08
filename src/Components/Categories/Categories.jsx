import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css'
import Slider from "react-slick";
import axios from 'axios';



export default function Categories() {
  const [categories, setCategories] = useState([])
  async function getCategories() {
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
    console.log(data.data);
    setCategories(data.data)
  }
  useEffect(() => {
    getCategories()
  }, [])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>

     <div className="container-fluid me-5">
     <Slider {...settings} className='mx-3'>
        {categories.map((category) =><div>
            <div className="mx-4">
            <img height={300} width={"100%"} className='' src={category.image} alt="" />
            <h3 className='h6'>{category.name}</h3>
            </div>
          </div>
        )}
      </Slider>
     </div>



    </>
  )
}
