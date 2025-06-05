import { useContext } from "react"
import React from 'react'
import Currpgcontext from "../context/currpgcontext"
export default function Header() {
    const context=useContext(Currpgcontext)
    const{currpg}=context
  return (

      <div className="header flex-row">{currpg}</div>
  )
}
