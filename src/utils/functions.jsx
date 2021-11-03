import { useState, useEffect, createContext, useContext, useRef } from 'react'
import { words } from '../data'
import * as sounds from '../sounds'

export const selectWord = (difficulty) => {
  let selectedWord

  const randomWord = (words) => {
    return words[Math.floor(Math.random() * words.length)]
  }

  switch (difficulty) {
    case 'medium':
      selectedWord = randomWord(words.medium)
      break
    case 'hard':
      selectedWord = randomWord(words.hard)
      break
    default:
      selectedWord = randomWord(words.easy)
      break
  }

  return selectedWord
}

const Context = createContext(null)

export const GameStateProvider = ({ children }) => {
  const [state, setState] = useState({
    userName: '',
    gameState: '',
    guess: '',
    selectedLetters: [],
    selectedWord: '',
    display: [],
    wrongGuesses: 0,
    score: 0,
    difficulty: 'easy',
    helpLimit: 3,
    mute: true,
  })

  const playingRef = useRef(new Audio(sounds.playing))

  let {
    userName,
    gameState,
    guess,
    selectedLetters,
    selectedWord,
    display,
    wrongGuesses,
    score,
    difficulty,
    helpLimit,
    mute,
  } = state

  const makeGuess = (letter, help = false) => {
    setState(() => {
      if (selectedLetters.includes(letter) || gameState !== 'start')
        return state

      new Audio(sounds.click).play()

      if (selectedWord.includes(letter)) {
        const updatedDisplay = display.map((l, id) => {
          if (letter === selectedWord[id]) {
            return ` ${letter} `
          }
          return l
        })

        new Audio(sounds.success).play()

        return {
          ...state,
          guess: letter,
          selectedLetters: [letter, ...selectedLetters],
          score: score + 5,
          display: updatedDisplay,
          helpLimit: help ? helpLimit - 1 : helpLimit,
        }
      } else {
        new Audio(sounds.failure).play()
        return {
          ...state,
          guess: letter,
          selectedLetters: [letter, ...selectedLetters],
          wrongGuesses: ++wrongGuesses,
        }
      }
    })
    
  }

  const setDifficulty = (selection) => {
    setState({ ...state, difficulty: selection })
  }

  const start = () => {
    const randomWord = selectWord(difficulty)

    setState({
      ...state,
      userName: userName ? userName : 'Anon',
      gameState: 'start',
      guess: '',
      selectedWord: randomWord,
      wrongGuesses: 0,
      selectedLetters: [],
      score: 0,
      mute: !mute,
      display: randomWord.split('').map((l) => ' _ '),
      helpLimit: 3,
    })
    new Audio(sounds.click).play()
    playingRef.current.loop = true
  }

  const setUserName = (name) => {
    setState({ ...state, userName: name })
  }

  const classes = (letter) => {
    let styles = []
    if (gameState === 'start') {
      styles.push('cursor-pointer hover:bg-dark-900')
    }

    const rightGuess = selectedWord.includes(letter)
    const selected = selectedLetters.includes(letter)
    if (rightGuess && selected) {
      styles.shift()
      styles.push('bg-green-800 cursor-not-allowed')
    } else if (!rightGuess && selected) {
      styles.shift()
      styles.push('bg-red-800 cursor-not-allowed')
    }

    return styles.join(' ')
  }

  const restart = () => {
    const display = selectedWord.split('').map((l) => ' _ ')

    const currentScore = selectedLetters.reduce((a, l) => {
      if (selectedWord.includes(l)) {
        return (a += 5)
      }
      return a
    }, 0)

    setState({
      ...state,
      wrongGuesses: 0,
      display,
      score: score - currentScore,
      selectedLetters: [],
      guess: '',
      helpLimit: 3,
    })

    new Audio(sounds.click).play()
  }

  const next = () => {
    const newWord = selectWord(difficulty)
    const display = newWord.split('').map((l) => ' _ ')
    setState({
      ...state,
      selectedWord: newWord,
      selectedLetters: [],
      guess: '',
      wrongGuesses: 0,
      display,
      gameState: 'start',
      helpLimit: 3,
    })
    new Audio(sounds.click).play()
  }

  const help = () => {
    let randomIndex

    do {
      randomIndex = Math.floor(Math.random() * selectedWord.length)
    } while (display[randomIndex] !== ' _ ')

    if (helpLimit === 0) return
    makeGuess(selectedWord[randomIndex], true)
  }

  const muteSound = () => {
    setState({ ...state, mute: !mute })
  }

  useEffect(() => {
    !mute ? playingRef.current.play() : playingRef.current.pause()
  }, [mute, gameState])

  useEffect(() => {
    if (state.wrongGuesses === 10 && display.indexOf(' _ ') !== -1) {
      setState({ ...state, gameState: 'over', mute: true })
      playingRef.current.currentTime = 0
      new Audio(sounds.gameOver).play()
    }

    if (
      state.wrongGuesses !== 10 &&
      display.indexOf(' _ ') === -1 &&
      gameState === 'start'
    ) {
      setState({
        ...state,
        gameState: 'win',
        mute: true,
        score: wrongGuesses < 5 ? score + 10 : score,
      })
      new Audio(sounds.win).play()
    }
  }, [guess, wrongGuesses])

  return (
    <Context.Provider
      value={{
        state,
        makeGuess,
        start,
        setUserName,
        classes,
        restart,
        next,
        setDifficulty,
        help,
        muteSound,
        mute,
      }}
    >
      {children}
    </Context.Provider>
  )
}

const useGameState = () => useContext(Context)

export default useGameState
