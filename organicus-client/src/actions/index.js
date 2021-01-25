
import * as types from '../constants/ActionTypes'
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const fetchProductsBegin = () => ({
    type: types.FETCH_PRODUCTS_BEGIN
});



export const receiveProducts = products => ({
    type: types.RECEIVE_PRODUCTS,
    products
})

export const getAllProducts = () => dispatch => {
    dispatch(fetchProductsBegin());
    
}
export const fetchSingleProduct = productId => ({
    type: types.FETCH_SINGLE_PRODUCT,
    productId
})




//it seems that I should probably use this as the basis for "Cart"
export const addToCart =  (product,qty) =>  (dispatch) => {
     dispatch(addToCartUnsafe(product, qty))
}
export const addToCartAndRemoveWishlist = (product,qty) => (dispatch) => {
    dispatch(addToCartUnsafe(product, qty));
    dispatch(removeFromWishlist(product));
}
export const addToCartUnsafe =  (product, qty) => ({
    type: types.ADD_TO_CART,
    product,
    qty
});

export const updateCart =  (product,qty) =>  (dispatch) => {
    dispatch(addCartUnsafe(product, qty))
}
export const addCartUnsafe =  (product, qty) => ({
    type: types.UPDATE_CART,
    product,
    qty
});

export const removeFromCart = product_id => (dispatch) => {
    
    dispatch({
        type: types.REMOVE_FROM_CART,
        product_id
    })
};

export const removeAllCart = () => (dispatch) => {
    dispatch({
        type: types.REMOVE_ALL_CART
    })
};

export const incrementQty = (product,qty) => (dispatch) => {
    dispatch(addToCartUnsafe(product, qty))

}
export const decrementQty = product => (dispatch) => {

    dispatch({
    type: types.DECREMENT_QTY,
    product})
};



//it seems that I should probably use this as the basis for "Wishlist"
export const addToWishlist =  (product) =>  (dispatch) => {
     dispatch(addToWishlistUnsafe(product))

}
export const addToWishlistUnsafe =  (product) => ({
    type: types.ADD_TO_WISHLIST,
    product
});

export const updateWishlist =  (product) =>  (dispatch) => {
    dispatch(updateWishlistUnsafe(product))

}
export const updateWishlistUnsafe =  (product) => ({
   type: types.UPDATE_WISHLIST,
   product
});

export const removeFromWishlist = product_id => (dispatch) => {
    dispatch({
        type: types.REMOVE_FROM_WISHLIST,
        product_id
    })
};


//Compare Products
export const addToCompare = (product) => (dispatch) => {
    toast.success("Item Added to Compare");
    dispatch(addToCompareUnsafe(product))

}
export const addToCompareUnsafe= (product) => ({
    type: types.ADD_TO_COMPARE,
    product
});
export const removeFromCompare = product_id => ({
    type: types.REMOVE_FROM_COMPARE,
    product_id
});


// Filters
export const filterBrand = (brand) => ({
    type: types.FILTER_BRAND,
    brand
});
export const filterColor = (color) => ({
    type: types.FILTER_COLOR,
    color
});
export const filterPrice = (value) => ({
    type: types.FILTER_PRICE,
    value
});
export const filterSort = (sort_by) => ({
    type: types.SORT_BY,
    sort_by
});


// Currency
export const changeCurrency = (symbol) => ({
    type: types.CHANGE_CURRENCY,
    symbol
});

