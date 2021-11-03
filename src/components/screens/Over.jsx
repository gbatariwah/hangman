import React from 'react'
import { motion } from 'framer-motion'
import useGameState from '../../utils/functions'

function Over() {
  const {
    state: { score, selectedWord, selectedLetters },
    start,
  } = useGameState()

  return (
    <div className='text-center font-bold mb-8 mt-6'>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className='mt-8'
      >
        <p className='text-2xl font-light'>Oh oh! 👽</p>
        <p className='text-6xl <sm:text-5xl'>
          {selectedWord.split('').map((l, id) => (
            <span
              className={selectedLetters.includes(l) ? '' : 'text-red-500'}
              key={id}
            >
              {' '}
              {l}{' '}
            </span>
          ))}
        </p>
        <div className='mt-4 font-light'>
          <p>
            Score : <span>{score} points</span>
          </p>
          <p className='mt-2'>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className='btn btn-dark btn-sm'
              onClick={start}
            >
              Play again
            </motion.button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Over
