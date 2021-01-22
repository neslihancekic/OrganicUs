
const API = process.env.NODE_ENV

export const signup = (user) => {
    return fetch(`${API}/signup`,{
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json();
    })
    .catch(error => {
        return error.json();
    })
}

export const signin = (user) => {
    return fetch(`${API}/signin`,{
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json();
    })
    .catch(error => {
        console.log(error)
        return error.json();
    })
}

export const authenticate =  (data,next) => {
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(data))
        next()
    }
}

export const signout = (next) => {
    if(typeof window !== 'undefined'){
        localStorage.clear()
        next()
        return fetch(`${API}/signout`,{
            method: "GET"
        })
        .then(response =>{
            console.log("signout", response)
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export const isAuthenticated = () => {
    if(typeof window == 'undefined'){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false
    }
}
