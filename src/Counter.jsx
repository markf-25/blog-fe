import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import fallback from "./assets/fallback.jpg"

import Image from "./components/Image/Image"
import Toast from "./components/Toast/Toast"
import ContentPage from "./components/Content/ContentPage/ContentPage"

import { removePost } from "./reducers/posts.slice.js"
import { useDispatch } from "react-redux"
import useSocketEmit from "./hooks/useSocketEmit.js"

import { useSelector } from "react-redux";
import { userSelector } from "./reducers/user.slice.js";

const Counter = () => {
  
    const [count, setCount] = useState(0)
    const dispatch = useDispatch()

    const user = useSelector(userSelector)

    const [toastMessage, setToastMessage] = useState("");

    const { deletePost } = useSocketEmit();


const post = {
  title: "PROVA DOPO IL LAZYSTATE",
  content: "Today I'm gonna non ricordo più il testo di lazysong. Così pigro che non lo cerco neanche. Credo che Bruno Mars sarebbe fiero di me",
  publishDate: 1853886976359,
};




  return (
    <>
      <div className="counter">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <div className="test">
        <Image src={fallback} alt="Immagine profilo" className="comment-avatar"/>
        <Image src={fallback} alt="Immagine profilo" className="avatar"/>
        <Image src={fallback} alt="Immagine profilo" className="post-image"/>
        </div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}         </button>
          <button onClick={() => setToastMessage("Clicca sul link che hai ricevuto via mail per scegliere una nuova password")}>
        TOASTESTER
        </button>

        <button onClick={()=> cancelPost({postId: "688c96cee15937484a200810"})}>POST DELETE TEST</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ContentPage/>
      {toastMessage && <Toast header="Cambio password" message={toastMessage} onClose={() => setToastMessage("")} />}
    </>
  )
}

export default Counter
