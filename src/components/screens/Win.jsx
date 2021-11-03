import React from 'react'
import {motion} from "framer-motion"
import useGameState from '../../utils/functions'

export default function Win() {

const {next} = useGameState()

 return (
   <div className='text-center font-bold mb-8 mt-6'>
     <motion.div
       initial={{ scale: 0 }}
       animate={{ scale: 1 }}
       exit={{ y: -100, opacity: 0 }}
       className='mt-8'
     >
       <p className='text-6xl <sm:text-4xl'>✨ Nice! ✨</p>
       <div className='mt-4 font-light'>
         <p className='mt-2'>
           <motion.button
             whileHover={{ scale: 1.1 }}
             className='btn btn-dark btn-sm'
             onClick={next}
           >
             Continue
           </motion.button>
         </p>
       </div>
     </motion.div>
   </div>
 )
}
