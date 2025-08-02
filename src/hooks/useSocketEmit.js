import {useContext} from "react";
import {SocketContext} from "../contexts/SocketProvider.jsx";
import { createPostAction, editPostAction, deletePostAction } from "../config";

const useSocketEmit = () => {
    const { socket } = useContext(SocketContext);

    const createPost = (post) => {
        return new Promise((resolve, reject) => {
            socket.emit(createPostAction, post, (response) => {
                if(response.success) {
                    resolve(response.data);
                } else {
                    reject(response.error);
                }
            })
        })
    }

    const deletePost = (post) => {
        return new Promise((resolve, reject) => {
            socket.emit(deletePostAction, post, (response) => {
                console.log("ENTRATO IN ATTESA DI RESPONSE", response);
                if(response.success) {
                    resolve(response.data);
                } else {
                    reject(response.error);
                }
            })
        })
    }

    const editPost = (post) => {
        return new Promise((resolve, reject) => {
            socket.emit(editPostAction, post, (response) => {
                if(response.success) {
                    resolve(response.data);
                } else {
                    reject(response.error);
                }
            })
        })
    }

    return {
        createPost,
        deletePost,
        editPost
    }
}

export default useSocketEmit;