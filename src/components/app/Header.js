import React, { Component } from 'react'


import {
    Link,
} from 'react-router-dom'



class Header extends Component {
    render() {
        return (
            <header>
            <nav className="main">
              <div className="imglogo">
              </div>
              <ul>
                <li><Link to="/home">Inicio</Link></li>
                <li><Link to="/login">login</Link></li>
                <li><Link to='/catalogo/habitacion/list'>Habitaciones</Link></li>
                <li><Link to="/photos">Fotos</Link></li>
                <li><Link to="/hotel/person2/list">Person</Link></li>
                <li><Link to="/hotel/categoria2/list">Categoria</Link></li>
              </ul>
              <span>
                <i className="fa fa-bars fa-2x " aria-hidden="true"></i>
              </span>
            </nav>
          </header>
        )
    }
}
export default (Header)