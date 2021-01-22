const API = process.env.NODE_ENV

export const addFav = (userId, token, req) => {
    return fetch(`${API}/addFavorite/${userId}`,{
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
        return error.json();
    })
}

export const listFav = async (userId, token) => {
    console.log("fav")
    try{
        const response = await fetch(`${API}/getFavorite/${userId}`,{
            method: "GET",
            headers:{
                Accept: 'application/json',
                "Content-Type" : 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        const json = await response.json();
        return json
    }catch{
        
    }
}

export const deleteFav = (userId, token, favoriteId) => {
    return fetch(`${API}/deleteFavorite/${favoriteId}/${userId}`,{
        method: "DELETE",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(response =>{
        return response.json();
    })
    .catch(error => {
        return error.json;
    })
}
