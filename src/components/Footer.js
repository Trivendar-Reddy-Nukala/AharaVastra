import React from 'react'
import logo from '../assessts/logo.png';
import Header from './Header'
function footer() {
  return (
    <>
      <div class="container-fluid bg-dark text-light text-center p-3 mb-0 bottom-0 w-100">
        <img src={logo} width="150rem" class="img-fluid p-0" />
        <h6>Copy-Write @ Ahara Vastra with Team Challengers</h6>
      </div>
    </>
  )
}

export default footer