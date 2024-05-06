import React from 'react'
import { Navbar1 } from './Navbar'

export const Layout = ({children}) => {
  return( <React.Fragment>
    <div className="container p-3 mx-auto">
        <Navbar1/>{children}
    </div>
  </React.Fragment>)
}
