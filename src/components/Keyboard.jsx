import * as React from 'react'
import { keys } from '../data'
import useGameState from '../utils/functions'

const Keyboard = () => {
  const {
    makeGuess,
    classes,
  } = useGameState()

  return (
    <section>
      <div className='flex justify-center gap-1 my-1 w-96'>
        {keys.first_row.map((letter, id) => (
          <kbd
            onClick={() => makeGuess(letter)}
            key={id}
            className={
              'shadow-xl shadow-light-800 kbd kbd-lg <sm:kbd-md ' +
              classes(letter)
            }
          >
            {letter}
          </kbd>
        ))}
      </div>
      <div className='flex justify-center gap-1 my-1 w-96'>
        {keys.second_row.map((letter, id) => (
          <kbd
            onClick={() => makeGuess(letter)}
            key={id}
            className={
              'shadow-xl shadow-light-800 kbd kbd-lg <sm:kbd-md ' +
              classes(letter)
            }
          >
            {letter}
          </kbd>
        ))}
      </div>
      <div className='flex justify-center gap-1 my-1 w-96'>
        {keys.third_row.map((letter, id) => (
          <kbd
            onClick={() => makeGuess(letter)}
            key={id}
            className={
              'shadow-xl shadow-light-800 kbd kbd-lg <sm:kbd-md ' +
              classes(letter)
            }
          >
            {letter}
          </kbd>
        ))}
      </div>
    </section>
  )
}

export default Keyboard
