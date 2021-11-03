import React from 'react'
import useGameState from '../../utils/functions'
import {click} from "../../sounds"

function Indeterminate() {
 const {state: {userName, difficulty}, start, setUserName, setDifficulty} = useGameState()

 return (
   <div className='text-center font-bold mb-8 mt-6'>
     <div className='mt-4'>
       <label
         htmlFor='modal'
         className='btn btn-dark modal-button'
         onClick={() => new Audio(click).play()}
       >
         Start Game
       </label>
       <input type='checkbox' id='modal' className='modal-toggle' />
       <div className='modal'>
         <div className='modal-box'>
           <div className='form-control'>
             <label>
               <span className='label-text text-center'>Name</span>
             </label>
             <input
               value={userName}
               onChange={(e) => setUserName(e.target.value)}
               type='text'
               placeholder='What is your name?'
               className='input input-dark input-bordered'
             />
           </div>
           <div className='mt-4'>
             <h2>Difficulty</h2>
             <div className='flex justify-between w-3/5 mt-1 mx-auto'>
               <div className='form-control'>
                 <label className='cursor-pointer label'>
                   <input
                     type='radio'
                     name='difficulty'
                     className='radio'
                     value='easy'
                     checked={difficulty === "easy"}
                     onChange={(e) => setDifficulty(e.target.value)}
                   />
                   <span className='label-text ml-2'> Easy</span>
                 </label>
               </div>
               <div className='form-control'>
                 <label className='cursor-pointer label'>
                   <input
                     type='radio'
                     name='difficulty'
                     className='radio'
                     value='medium'
                     onChange={(e) => setDifficulty(e.target.value)}
                   />
                   <span className='label-text ml-2'>Medium</span>
                 </label>
               </div>
               <div className='form-control'>
                 <label className='cursor-pointer label'>
                   <input
                     type='radio'
                     name='difficulty'
                     className='radio'
                     value='hard'
                     onChange={(e) => setDifficulty(e.target.value)}
                   />
                   <span className='label-text ml-2'>Hard</span>
                 </label>
               </div>
             </div>
           </div>
           <div className='modal-action'>
             <label
               onClick={start}
               htmlFor='modal'
               className='btn btn-info btn-sm'
             >
               Start
             </label>
             <label htmlFor='modal' className='btn btn-outline btn-sm'>
               Close
             </label>
           </div>
         </div>
       </div>
     </div>
   </div>
 )
}

export default Indeterminate
