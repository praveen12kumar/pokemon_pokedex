import React from 'react'
import { createPortal } from 'react-dom'

function Modal({ onClose, children }) {
  return createPortal(
    <div
      className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <div
        className='bg-slate-800 rounded-lg p-6 max-w-md w-full text-white font-nunito relative max-h-[80vh] overflow-auto'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className='absolute top-2 right-4 text-2xl cursor-pointer hover:text-green-500'
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal
