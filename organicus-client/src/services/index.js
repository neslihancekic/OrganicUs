// Get Unique Brands from Json Data
export const getBrands = (products) => {
    var uniqueBrands = [];
    products.map((product, index) => {
        if (product.CategoryID) {
            
            if (uniqueBrands.indexOf(product.CategoryID.name) === -1) {
                uniqueBrands.push(product.CategoryID.name);
            }
        }
    })
    //console.log(uniqueBrands)
    return uniqueBrands;
}

// Get Minimum and Maximum Prices from Json Data
export const getMinMaxPrice = (products) => {
    console.log(products)
    let min = 0, max = 100;

    products.map((product, index) => {
        let v = product.Price;
        min = (v < min) ? v : min;
        max = (v > max) ? v : max;
    })

    return {'min':min, 'max':max};
}

export const getVisibleproducts = (data, { brand, color, value, sortBy }) => {
    var filter = data.filter(product => {
        let brandMatch;
        if(product.CategoryID)
            brandMatch = brand.includes(product.CategoryID.name)

        else
            brandMatch = true;
        const startPriceMatch = typeof value.min !== 'number' || value.min <= product.Price;
        const endPriceMatch = typeof value.max !== 'number' || product.Price <= value.max;
       
        return brandMatch && startPriceMatch && endPriceMatch;
    }).sort((product1, product2) => {
        if (sortBy === 'HighToLow') {
            return product2.Price < product1.Price ? -1 : 1;
        } else if (sortBy === 'LowToHigh') {
            return product2.Price > product1.Price ? -1 : 1;
        } else if (sortBy === 'Newest') {
            return product2._id < product1._id ? -1 : 1;
        } else if (sortBy === 'AscOrder') {
            return product1.Title.localeCompare(product2.Title);
        } else if (sortBy === 'DescOrder') {
            return product2.Title.localeCompare(product1.Title);
        } else{
            return product2._id > product1._id ? -1 : 1;
        }
    });
    return filter;
}

export const getCartTotal = cartItems => {
    var total = 0;
    for(var i=0; i<cartItems.length; i++){
        total += parseFloat(cartItems[i].sum)
    }
    return total.toFixed(2);
}

// Get Trending Tag wise Collection
export const getTrendingTagCollection = (products, type, tag) => {
    const items = products.filter(product => {
        return product.category === type && product.tags.includes(tag);
    })
    return items.slice(0,8)
}

// Get Trending Collection
export const getTrendingCollection = (products, type) => {
    const items = products.filter(product => {
        return product.category === type;
    })
    return items.slice(0,8)
}

// Get Special 5 Collection
export const getSpecialCollection = (products, type) => {
    const items = products.filter(product => {
        return product.category === type;
    })
    return items.slice(0,5)
}

// Get TOP Collection
export const getTopCollection = products => {
    const items = products.filter(product => {
        return product.rating > 4;
    })
    return items.slice(0,8)
}

// Get New Products
export const getNewProducts = (products, type) => {
    const items = products.filter(product => {
        return product.new === true && product.category === type;
    })

    return items.slice(0,8)
}

// Get Related Items
export const getRelatedItems = (products, type) => {
    const items = products.filter(product => {
        return product.category === type;
    })

    return items.slice(0,4)

}

// Get Best Seller Furniture
export const getBestSellerProducts = (products, type) => {
    const items = products.filter(product => {
        return product.sale === true && product.category === type;
    })

    return items.slice(0,8)
}

// Get Best Seller
export const getBestSeller = products => {
    const items = products.filter(product => {
        return product.sale === true;
    })

    return items.slice(0,8)
}

// Get Mens Wear
export const getMensWear = products => {
    const items = products.filter(product => {
        return product.category === 'men';
    })

    return items.slice(0,8)
}

// Get Womens Wear
export const getWomensWear = products => {
    const items = products.filter(product => {
        return product.category === 'women';
    })

    return items.slice(0,8)
}

// Get Single Product
export const getSingleItem = (products, id) => {

    const items = products.find((element) => {
        return element._id === id;
    })
    return items;
}

// Get Feature Products
export const getFeatureImages = (products, type) => {

    const items = products.filter(product => {
        return product.type === type;
    })
    return items;
}


