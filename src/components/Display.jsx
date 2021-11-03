import React from 'react'
import useGameState from '../utils/functions'
import {motion, AnimatePresence} from "framer-motion"
import Start from './screens/Start'
import Indeterminate from './screens/Indeterminate'
import Over from './screens/Over'
import Win from './screens/Win'


const Display = () => {
  const { state : {gameState} } = useGameState()
   

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.section className='border px-5 py-2 rounded-4xl shadow-lg shadow-light-800'>
        {gameState === 'start' && <Start />}
        {gameState === '' && <Indeterminate />}
        {gameState === 'over' && <Over />}
        {gameState === 'win' && <Win />}
      </motion.section>
    </AnimatePresence>
  )
}

export default Display
