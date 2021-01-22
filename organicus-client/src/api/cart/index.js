const API = process.env.NODE_ENV

export const createBasketLine = (userId, token, ProductId) => {
    return fetch(`${API}/basket/${userId}`,{
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(ProductId)
    })
    .then(response =>{
        return response.json();
    })
    .catch(error => {
        return error;
    })
}

export const listBasketLines = async (userId, token) => {
    try{
        const response =await fetch(`${API}/basket/${userId}`,{
            method: "GET",
            headers:{
                Accept: 'application/json',
                "Content-Type" : 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        const json =await response.json()
        return json
    }catch {
    }
}

export const deleteBasketLine = (userId, token, BasketLineId) => {
    return fetch(`${API}/basket/${userId}`,{
        method: "DELETE",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(BasketLineId)
    })
    .then(response =>{
        return response.json();
    })
    .catch(error => {
        return error;
    })
}

export const updateBasketLine = (userId, token, req) => {
    return fetch(`${API}/basket/${userId}`,{
        method: "PATCH",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(req)
    })
    .then(response =>{
        return response.json();
    })
    .catch(error => {
        return error;
    })
}

export const confirmOrder = (userId,token,req) => {
    return fetch(`${API}/basket/${userId}/confirm`,{
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(req)
    })
    .then(response =>{
        return response.json();
    })
    .catch(error => {
        return error;
    })
}

export const GetOrders = (userId,token) => {
    return fetch(`${API}/order/${userId}/list`,{
        method: "GET",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(error => {
        return error;
    })
}