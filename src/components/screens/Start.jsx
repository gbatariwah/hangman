import React from 'react'
import { motion } from 'framer-motion'
import useGameState from '../../utils/functions'
import { status } from '../../data'

export default function Start() {
  const {
    state: { userName, score, display, wrongGuesses, helpLimit, mute },
    muteSound,
    restart,
    help,
  } = useGameState()

  return (
    <>
      <div className='flex justify-between items-center'>
        <div>
          <button
            onClick={restart}
            className='btn btn-sm btn-circle btn-ghost relative text-lg mr-1'
          >
            🔄
          </button>
          <button
            onClick={help}
            className='text-lg btn btn-sm btn-circle relative'
          >
            👁
            <span
              className='absolute -top-3 -right-4 text-light-300
            text-sm font-bold bg-red-600 h-25px w-25px rounded-1/2 opacity-80'
            >
              {helpLimit}
            </span>
          </button>
        </div>
        <motion.button
          onClick={muteSound}
          className='self-start btn btn-sm text-xl btn-circle'
          whileHover={{ scale: 1.05 }}
        >
          {mute ? <span>🔇</span> : <span>🔈</span>}
        </motion.button>
        <div className='bg-dark-600 px-4 py-1 rounded-xl bg-opacity-30 self-center'>
          <p className='font-light'>
            Name ➥ <span className='font-bold text-yellow-400'>{userName}</span>
          </p>
          <div className='font-light flex'>
            <p>Score ➥ </p>
            <p className='font-bold text-green-400 text-center flex-1'>
              {score}
              <span className='font-light text-white'> pts</span>
            </p>
          </div>
        </div>
      </div>
      <div className='text-center font-bold mb-8 mt-2'>
        <motion.p
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className='text-5xl <sm:text-4xl'
        >
          {display}
        </motion.p>
      </div>
      <div className='flex justify-between items-center'>
        <div className='p-2'>
          <p className='text-4xl'>{status[wrongGuesses]}</p>
        </div>
        <div className='bg-dark-600 p-2 rounded-md bg-opacity-30 self-center'>
          <p>
            <span className='font-light'>❌ ➥</span>{' '}
            <span className='font-bold text-red-600'>{wrongGuesses}</span>
          </p>
        </div>
      </div>
    </>
  )
}
