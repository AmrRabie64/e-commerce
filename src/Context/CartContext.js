import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext(0)

export default function CartContextProvider(props) {
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [numOfWishlistItems, setNumOfWishlistItems] = useState(0)
    const [cartId, setCartId] = useState(null)

    useEffect(()=>{
        getInitialValues()
        getWishlistCount()
    })

    async function getInitialValues() {
        let {data} = await getCart()
        if (data && data.status == 'success'){
            setNumOfCartItems(data.numOfCartItems)
            setCartId(data.data._id)

        }
            
    }
    async function getWishlistCount(){
        let data = await getWishlist()
        if (data) {
            setNumOfWishlistItems(data.data.count)
            
        }
    }
        
    let headers = { token: localStorage.getItem("userToken") }
    function createCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            { productId: productId },
            {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            }
        ).then(res => res)
            .catch(err => err)
    }
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
    function getWishlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,

            {
                headers,

            }
        ).then(res => res)
            .catch(err => err)
    }
    function deleteWishlistItem(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
            {
                headers,
            }
        ).then(res => res)
            .catch(err => err)
    }
    function getCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,

            {
                headers,

            }
        ).then(res => res)
            .catch(err => err)
    }
    function updateCart(id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count },
            {
                headers,
            }
        ).then(res => res)
            .catch(err => err)
    }
    function deleteCartItem(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {
                headers,
            }
        ).then(res => res)
            .catch(err => err)
    }
    function generateOnlinPayment(cartId, shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            { shippingAddress: shippingAddress },
            {
                headers
            }
        ).then((res) => res)
            .catch((err) => err)
    }
    
    const [cart, setCart] = useState(0)
    return <CartContext.Provider value={{ cart, setNumOfCartItems, numOfCartItems, createWishlist, getWishlist, setNumOfWishlistItems,numOfWishlistItems, cartId,  generateOnlinPayment, createCart, getCart, updateCart, deleteCartItem , deleteWishlistItem }}>
        {props.children}
    </CartContext.Provider>
}