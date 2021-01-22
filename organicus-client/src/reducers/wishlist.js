import {
    ADD_TO_WISHLIST,REMOVE_FROM_WISHLIST ,UPDATE_WISHLIST} from "../constants/ActionTypes";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {isAuthenticated} from '../api/auth';
import {addFav,listFav,deleteFav} from '../api/favorite'; 

export default function wishlistReducer(state = {
    list: []
}, action) {
    
    const{user,token} = isAuthenticated()   
    switch (action.type) {
        case ADD_TO_WISHLIST:
            if(user===undefined){
                toast.error("You have to login!")
                return { ...state }
            }
            addFav(user._id,token,{"ProductId":action.product._id})
            .then(data => {
                if(data.err){ 
                    toast.error('Error occured!')
                }else{
                }
            })
            var productId = action.product._id
            if (state.list.findIndex(product => product._id === productId) !== -1) {
                const list = state.list.reduce((cartAcc, product) => {
                    if (product._id === productId) {
                        cartAcc.push({ ...product }) 
                    } else {
                        cartAcc.push(product)
                    }

                    return cartAcc
                }, [])
                
                toast.success("Item Added to Favorites");
                return { ...state, list }
            }
            
            toast.success("Item Added to Favorites");
            return { ...state, list: [...state.list, action.product] }

        case UPDATE_WISHLIST:
                if(user===undefined){
                    toast.error("You have to login!")
                    return { ...state }
                }
                var productId = action.product._id
                if (state.list.findIndex(product => product._id === productId) !== -1) {
                    const list = state.list.reduce((cartAcc, product) => {
                        if (product._id === productId) {
                            cartAcc.push({ ...product }) 
                        } else {
                            cartAcc.push(product)
                        }
    
                        return cartAcc
                    }, [])
                    
                    return { ...state, list }
                }
                
                return { ...state, list: [...state.list, action.product] }

        case REMOVE_FROM_WISHLIST:
            if(user===undefined){
                toast.error("You have to login!")
                return { ...state }
            }
            listFav(user._id,token)
            .then(data => {
                if(data == undefined){ 
                    toast.error('Error occured!')
                }else{
                    console.log(data,action.product_id._id)
                    var fav =data.filter(d => d.ProductId._id===action.product_id._id);
                    deleteFav(user._id,token,fav[0]._id)
                    .then(data => {
                        if(data == undefined){ 
                            toast.error('Error occured!')
                        }else{
                        }
            })
                }
            })
            
            toast.error("Item Removed from Favorites");
            return {
                list: state.list.filter(id => id !== action.product_id)
            }

        default:
    }
    return state;
}
