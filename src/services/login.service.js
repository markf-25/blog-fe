import {loginUser } from "../config"

export const login = async (loginData) => {
    try {
        const response = await fetch(loginUser, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginData)
        })
        const data = await response.json();

        if (response.ok) {
            return data
        }
    } catch(error){
        console.error("Errore in login", error);
    }
}