const API = process.env.NODE_ENV

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/createCategory/${userId}`,{
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response =>{
        return response.json();
    })
    .catch(error => {
        return error.json();
    })
}

export const listCategory = () => {
    return fetch(`${API}/categories`,{
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

export const deleteProduct = (productId,userId,token) => {
    return fetch(`${API}/deleteProduct/${productId}/${userId}`,{
        method: "DELETE",
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
        return error.json();
    })
}

export const listProducerProducts = (userId) => {
    return fetch(`${API}/products/producer/${userId}`,{
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


export const createProduct = (userId, token, product) => {
    return fetch(`${API}/createProduct/${userId}`,{
        method: "POST",
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response =>{
        return response.json();
    })
    .catch(error => {
        return error.json();
    })
}

export const updateProduct = (userId, token, product, productId) => {
    return fetch(`${API}/updateProduct/${productId}/${userId}`,{
        method: "PUT",
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response =>{
        return response.json();
    })
    .catch(error => {
        return error.json();
    })
}

export const GetOrders = (userId,token) => {
    return fetch(`${API}/order/${userId}/listProducer`,{
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

export const GetEarning= (userId,token) => {
    return fetch(`${API}/order/${userId}/totalEarning`,{
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

export const GetSold = (userId,token) => {
    return fetch(`${API}/order/${userId}/totalSold`,{
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

export const updateOrder = (userId,token,body) => {
    return fetch(`${API}/order/${userId}`,{
        method: "PUT",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    .then(response =>{
        return response.json();
    })
    .catch(error => {
        return error;
    })
}