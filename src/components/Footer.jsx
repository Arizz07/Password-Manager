import React from 'react'

function Footer() {
    return (
        <div className="footer bg-teal-800 flex flex-col justify-center items-center bottom-0 w-full">
            <div className=" flex name">
                <span className='text-green-400 text-lg font-bold' >&lt;</span>
                <h2 className='text-white text-lg font-bold'>Pass</h2>
                <span className='text-green-400 text-lg font-bold'  >OP/&gt;</span>
            </div>
            <div className=" desc text-white">
               <span className='flex'>created with <img className='w-8' src="/Heart.png" alt="" />By Azz</span> 
            </div>
        </div>
    )
}

export default Footer