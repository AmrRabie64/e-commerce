import React, { useContext, useEffect } from 'react'
import styles from './Brands.module.css'
import { CartContext } from '../../Context/CartContext'
import { useState } from 'react'
import axios from 'axios'

export default function Brands() {
  let [brands , setBrands] = useState([])
  
  async function getBrands() {
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`).then((res) => res).catch((err) => err)
    console.log(data);
    setBrands(data.data)
}

  
  useEffect(()=>{
    getBrands()
  },[])
  return (
    <div className="container my-4 p-5">
      <div className="row">
        {brands.map((brand) => <><div className="col-md-4  g-5 text-center shadow">
          
          <img src={brand.image} className='w-100' alt="" />
          <h2 className='text-primary'>{brand.name}</h2>
          </div>
          </>)}
      </div>
    </div>
  )
}
