import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import fallback from "./assets/fallback.jpg"

import {useNavigate} from "react-router"

import Image from "./components/Image/Image"

const Counter = () => {
  
    const [count, setCount] = useState(0)
    const navigate = useNavigate()

  return (
    <>
      <div>
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
          <button onClick={() => navigate("/user")}>
        USER PROFILE
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Counter
