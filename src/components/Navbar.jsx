import React from 'react'

function Navbar() {
  return (
   <nav className='bg-teal-800 flex justify-between  px-4 py-2'>
    <div className='flex'>
    <span className='text-green-400 text-lg font-bold' >&lt;</span>
    <h2 className='text-white text-lg font-bold'>Pass</h2>
    <span className='text-green-400 text-lg font-bold'  >OP/&gt;</span>
    </div>
    <div className="links">
        <button className='bg-teal-400 rounded-md px-2 py-1'>
            <span className='text-white'>GitHub</span>
        </button>
    </div>
   </nav>
  )
}

export default Navbar