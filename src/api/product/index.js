const API = process.env.NODE_ENV


export const homeNewProducts = () => {
    return fetch(`${API}/products?limit=8&order=desc`,{
        method: "GET",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json'
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(error => {
        return error.json();
    })
}
export const homeTopProducts = () => {
    return fetch(`${API}/products?limit=5&order=desc&sortBy=Star`,{
        method: "GET",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json'
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(error => {
        return error.json();
    })
}

export const getProduct = async (productId) => {
    try{
        const response = await fetch(`${API}/getProduct/${productId}`,{
            method: "GET",
            headers:{
                Accept: 'application/json',
                "Content-Type" : 'application/json'
            }
        })
        const json = await response.json()
        return json
    }
    catch {
    }
}

export const listProduct = async (limit) => {
    try{
        const response = await fetch(`${API}/products?limit=${limit}`,{
            method: "GET",
            headers:{
                Accept: 'application/json',
                "Content-Type" : 'application/json'
            }
        })
        const json = await response.json()
        return json
    }
    catch {
    }
}


export const relatedProduct = async (categoryId) => {
    try{
        const response = await fetch(`${API}/products/filterBy/${categoryId}?limit=6&order=desc`,{
            method: "GET",
            headers:{
                Accept: 'application/json',
                "Content-Type" : 'application/json'
            }
        })
        const json = await response.json()
        return json
    }
    catch {
    }
}

