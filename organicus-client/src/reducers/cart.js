import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    REMOVE_ALL_CART,
    UPDATE_CART,
    DECREMENT_QTY } from "../constants/ActionTypes";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {isAuthenticated} from '../api/auth';
import {createBasketLine,deleteBasketLine,listBasketLines,updateBasketLine} from '../api/cart'; 

export default function cartReducer(state = {
    cart: []
}, action) {
    
    const{user,token} = isAuthenticated()   
    switch (action.type) {
        
        case ADD_TO_CART:
            if(user===undefined){
                toast.error("You have to login!")
                return { ...state }
            }
            var productId = action.product._id
            createBasketLine(user._id,token,{"ProductId":action.product._id})
            .then(data => {
                if(data.err){ 
                    toast.error('Error occured!')
                }else{
                }
            })
            if (state.cart.findIndex(product => product._id === productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product._id === productId) {
                        var price = 0;
                        product.IsDiscounted===false ? price  =  product.Price : price = (product.Price - product.Price*product.DiscountPercentage/100);
                        cartAcc.push({ ...product, qty: product.qty+1, sum: (price*(product.qty+1)).toFixed(2)}) // Increment qty
                    } else {
                        //addbasketline
                        cartAcc.push(product)
                    }
                    return cartAcc
                }, [])
                
                toast.success("Item Added to Cart");
                return { ...state, cart }
            }
            var price = 0;
            action.product.IsDiscounted===false ? price  =  action.product.Price : price = (action.product.Price - action.product.Price*action.product.DiscountPercentage/100);
            
            toast.success("Item Added to Cart");
            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: (price*action.qty).toFixed(2)}] }
        
        case UPDATE_CART:
            if(user===undefined){
                toast.error("You have to login!")
                return { ...state }
            }
            var productId = action.product._id
            if (state.cart.findIndex(product => product._id === productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product._id === productId) {
                        var price = 0;
                        product.IsDiscounted===false ? price  =  product.Price : price = (product.Price - product.Price*product.DiscountPercentage/100);
                        cartAcc.push({ ...product, qty: product.qty+1, sum: (price*(product.qty+1)).toFixed(2)}) // Increment qty
                    } else {
                        //addbasketline
                        cartAcc.push(product)
                    }
                    return cartAcc
                }, [])
                
                return { ...state, cart }
            }
            var price = 0;
            action.product.IsDiscounted===false ? price  =  action.product.Price : price = (action.product.Price - action.product.Price*action.product.DiscountPercentage/100);
            
            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: (price*action.qty).toFixed(2)}] }
        


        case DECREMENT_QTY:
             
            if(user===undefined){
                toast.error("You have to login!")
                return { ...state }
            }
            listBasketLines(user._id,token)
            .then(data => {
                if(data == undefined){ 
                    toast.error('Error occured!')
                }else{
                    var basketline =data.basketLines.filter(d => d.ProductId===action.product._id);
                    updateBasketLine(user._id,token,{"basketLineId":basketline[0]._id,"quantity":action.product.qty-1})
                    .then(data => {
                        if(data == undefined){ 
                            toast.error('Error occured!')
                        }else{
                        }
            })
                }
            })
            
            var productId = action.product._id
            if (state.cart.findIndex(product => product._id === productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product._id === productId && product.qty > 1) {
                        //console.log('price: '+product.price+'Qty: '+product.qty)
                        var price = 0;
                        product.IsDiscounted===false ? price  =  product.Price : price = (product.Price - product.Price*product.DiscountPercentage/100);
                        cartAcc.push({ ...product, qty: product.qty-1, sum: (price*(product.qty-1)).toFixed(2) }) // Decrement qty
                    } else {
                        cartAcc.push(product)
                    }
                    
                    return cartAcc
                }, [])
                
                toast.warn("Item Decrement Qty to Cart");
                return { ...state, cart }
            }
            
            toast.warn("Item Decrement Qty to Cart");
            var price = 0;
            action.product.IsDiscounted===false ? price  =  action.product.Price : price = (action.product.Price - action.product.Price*action.product.DiscountPercentage/100);
            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: (price*action.qty).toFixed(2) }] }

        case REMOVE_FROM_CART:
            
            if(user===undefined){
                toast.error("You have to login!")
                return { ...state }
            }
            listBasketLines(user._id,token)
            .then(data => {
                if(data == undefined){ 
                    toast.error('Error occured!')
                }else{
                    var basketline =data.basketLines.filter(d => d.ProductId===action.product_id._id);
                    deleteBasketLine(user._id,token,{basketLineId:basketline[0]._id})
                    .then(data => {
                        if(data == undefined){ 
                            toast.error('Error occured!')
                        }else{
                        }
            })
                }
            })
            
            toast.error("Item Removed from Cart");
            return {
                cart: state.cart.filter(item => item._id !== action.product_id._id)
            }
       
        case REMOVE_ALL_CART:
            
                if(user===undefined){
                    toast.error("You have to login!")
                    return { ...state }
                }
                state.cart.length=0
                console.log(state.cart)
                return {
                    cart: state.cart
                }

        default:
    }
    return state;
}
