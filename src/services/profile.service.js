import { profileUpdate } from "../config"

export const editProfile = async ({ username, avatar, token }) => {
    console.log("I DATI INVIATI", username, avatar, token)
    try {
        const response = await fetch(profileUpdate, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify({ username: username, avatar: avatar })
        })

        const data = await response.json();
        if (response.ok) {
            console.log("Response", response)
            console.log("Data", data)
            return data
        }

    } catch (error) {
        console.error(error)
    }
}