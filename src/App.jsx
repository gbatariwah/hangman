import './App.css'
import Display from './components/Display'
import React from 'react'
import Keyboard from './components/Keyboard'
import { GameStateProvider } from './utils/functions'
import {motion} from "framer-motion"

function App() {
  return (
    <GameStateProvider>
      <div className='container mx-auto max-w-640px px-5'>
        <motion.h1 initial={{x: -50, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 0.5}} className='text-center text-5xl pt-5 pb-10 underline tracking-wider'>
          Hangman
        </motion.h1>
        <Display />
        <div className='mt-12 flex justify-center'>
          <Keyboard />
        </div>
        <p className="mt-20 text-right text-xs italic">Developed by <b>Gerald Batariwah</b></p>
      </div>
    </GameStateProvider>
  )
}

export default App
