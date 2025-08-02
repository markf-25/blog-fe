import { retrievePosts, retrieveSinglePost } from "../config";

export const getPosts = async (lazyState) => {
    try {
        const parameters = new URLSearchParams({
            cursor: lazyState.cursor || "",
            direction: lazyState.direction || "next",
            limit: lazyState.limit?.toString() || "10",
        }).toString();

        const response = await fetch(`${retrievePosts}?${parameters}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        })
        const data = await response.json();

        if (response.ok) {
            return data
        }
    } catch (error) {
        console.error(error);
    }
}

export const getPostById = async (id) => {
    try {
        const response = await fetch(retrieveSinglePost(id), {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        })
        const data = await response.json();

        if (response.ok) {
            return data
        }
    } catch (error) {
        console.error(error);
    }
}