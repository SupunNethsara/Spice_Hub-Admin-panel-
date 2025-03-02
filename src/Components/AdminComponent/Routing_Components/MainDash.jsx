import React from 'react'
import Stats from './MainDashComponents/Stats'

export default function MainDash() {
  return (
    <div>
        <div className='flex w-full '>
      <div className='w-4/6'>
      <Stats/>
      </div>
      <div className='w-2/6'>

      </div>
        </div>
    </div>
  )
}
