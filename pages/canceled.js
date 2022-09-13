import React from 'react';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';

const Canceled = () => {
  return (
    <div className='cancel-wrapper'>
      <div className='cancel'>
        <p className='description'>
          Forgot to add something to your cart? Shop around then come back to pay!
        </p>
        <Link href='/'>
          <button type='button' width="300px" className='btn' >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Canceled
