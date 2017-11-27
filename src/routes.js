import React from 'react'
//import loadable from 'loadable-components';

import CategoriaList from './components/categoria/List'
import CategoriaForm from './components/categoria/Form'
import Habitacion from './components/habitacion/Habitacion'
import Home from './components/home/Home'
import Login from './components/Login'

import { RouteWithSubRoutes } from './node_m/react-router-dom-ext'

////
const Link = ({ routes }) => (
  <div>
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} exact={route.exact} {...route} />
    ))}
  </div>
)
const routese = [
  {
    path: '/login',
    title: 'Login!',
    icon: 'home',
    component: Login
  }
]
const routes = [
  {
    path: '/home',
    //title: 'Home!',
    component: Home
  },
  {
    path: '/catalogo/habitacion/list',
    //title: 'list cat!',
    component: Habitacion
  },
  {
    path: '/catalogo',
    //title: 'catalogo!',
    component: Link,
    routes: [
      {
        path: '/catalogo/categorias',
        //title: 'categorias!',
        component: Link,
        routes: [
          {
            path: '/catalogo/categorias/list',
            //title: 'list cat!',
            component: CategoriaList
          },
          {
            path: '/catalogo/categorias/new',
            //title: 'new cat!',
            component: CategoriaForm
          },
          {
            path: '/catalogo/categorias/edit/:id',
            //title: 'edit cat!',
            component: CategoriaForm
          }
          
        ]
        
      }
    ]
  }
]

export { routes, routese }






/*
//import { Redirect } from 'react-router'
import {
  Route,
  Redirect

} from 'react-router-dom'
class Tacos2x extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    }
    props.history.push(props.routes[0].path)

  }
  componentWillMount = () => {

   // this.props.history.push('/categorias/list/list')

  }
  componentDidMount = () => {

    this.setState({
      redirect: true,
    })
  }
  handleClick = () => {
    if (this.state.redirect) {
      this.props.history.push(this.props.routes[0].path)
    }
  }

  render() {
    //console.log(JSON.stringify(this.props))
    const { routes, history } = this.props
    //console.log(JSON.stringify(routes[0].path))
    //history.push('/categorias/list/list');
    //console.log(JSON.stringify(this.state.redirect))
    
       // if (this.state.redirect) {
    
         // this.props.history.push('/categorias/list/list')
    
        //} 
    
    return (
      <div>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
        
        <button onClick={this.handleClick}>
                        Volver
                    </button>
      </div>
    )
    
  }

}

const Tacos2p = ({ routes }) => (
  <div>
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route} />
    ))}
    

  </div>
)
*/