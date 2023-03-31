import React from 'react'

const PageContainer = ({children}) => {
  return (
    <div className='flex h-screen w-full'>{children}</div>
  )
}

export default PageContainer