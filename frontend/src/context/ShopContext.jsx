import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
export const ShopContext = createContext()

const ShopContextProvider = (props)=>{
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false)
    const [cartItems,setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [ token, setToken ] = useState('')

    const currency = '₹';
    const delivery_fee = 30;
    const axiosInstance = axios.create({
        timeout: 10000, // Timeout after 10 seconds
      })

    useEffect(()=>{
        getProducts()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    const addToCart = async ( itemId, size )=>{

        if(!size){
            toast.error('Please Select the Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            if( cartData [itemId][size] ){
                cartData[itemId][size] += 1
            }else{
                cartData[itemId][size] = 1 
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData);

        if(token){
            try {
                const response = await axios.post( import.meta.env.VITE_BACKEND_URI+'/api/cart/add', { itemId,size }, { headers: {Authorization:token} } )
                 toast.success(response.data.message)
            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }
        }
    }

    const getCartCount = ()=>{
        let totalCount = 0;

        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity)=>{
        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity
        setCartItems(cartData)

        if(token){
            try {
                await axios.post(import.meta.env.VITE_BACKEND_URI+'/api/cart/update' ,
                    {itemId, size, quantity},
                    {headers:{Authorization:token}}
                 )
            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }
        }
    }

    const getUserCart = async (token) =>{
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URI+'/api/cart/get',
                {},
                { headers: { Authorization: token }}
            )
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    const getCartAmount = ()=>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const getProducts = async ()=>{
        try {
            const response = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URI}/api/product/list`,{withCredentials:true})

                if(response.data.success){
                    setProducts(response.data.product)
                }else{
                    toast.error(response.data.message)
                }
        } catch (error) {
            console.error(error);
            toast.error(error.message)
            
        }
    }

    const value = {
         currency , delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,setCartItems,
        addToCart,
        getCartCount,updateQuantity,
        getCartAmount,
         products,  
        token,setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;

