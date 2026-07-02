import React from 'react'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className='w-full h-[calc(100vh-10vh)] flex flex-col items-center justify-center gap-4 text-white font-nunito'>
      <p className='text-xl text-center px-10'>{message || "Something went wrong."}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className='border border-slate-300 px-4 py-2 rounded-md uppercase text-sm cursor-pointer hover:scale-105 transition-all duration-300 ease-in'
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
