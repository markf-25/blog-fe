import {registrateUser, usernameValidationWithoutUsername } from "../config"

export const signUp = async (signUpData) => {
    try {

        const response = await fetch(registrateUser, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(signUpData)
        })
        const data = await response.json();

        if (response.ok) {
            return data
        }
    } catch(error){
        console.error("Questo è l'errore:", error);
    }
}

//Non entra mai nella catch. La response contiene l'errore?

export const usernameAvailable = async (username) => {

    const usernameValidation = usernameValidationWithoutUsername + username

    try {
        const response = await fetch(usernameValidation, {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        })
        const data = await response.json();

        if (response.ok) {
            return data
        }
    } catch(error){
        return error
    }
}