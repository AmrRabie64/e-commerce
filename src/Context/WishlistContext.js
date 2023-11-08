import React, { useState } from 'react'
import axios from 'axios'
import { createContext } from "react";


export const WishlistContext = createContext(0)

export default function WishlistContextProvider(props) {
    let headers = { token: localStorage.getItem("userToken") }
    function createWishlist(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            { productId: productId },
            {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            }
        ).then(res => res)
            .catch(err => err)
    }
    const[wishlist,setWishlist]=useState(0)
    
  return <WishlistContext.Provider value={{wishlist ,createWishlist}}>
        {props.children}
    </WishlistContext.Provider>
  
}

