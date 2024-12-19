import Link from 'next/link'
import React from 'react'

// import { AbrilFatface } from '@/app/layout'

const TitleIcon = () => {
  return (
    <h1 className="text-3xl font-AbrilFatface font-medium ">
      <Link href="/">
        <span className="text-white">Pizza</span>
        <span className="text-red-700">Chess</span>
      </Link>
    </h1>
  )
}

export default TitleIcon
