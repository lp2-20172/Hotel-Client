import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'

import {
  withRouter
} from 'react-router-dom'
import { RouteWithSubRoutes } from '../../node_m/react-router-dom-ext'

import {
  Link ,Route
} from 'react-router-dom'
import { routes, routese } from '../../routes'
import Header from './Header'
import Footer from './Footer'

////////
import { connect } from 'react-redux'
import { toggleTheme } from '../../actions'
import { login, logout } from '../utils/OAuth2'
import config from '../../conn'
import { getLocalUserInfo } from '../../actions/auth-action'

///////
import '../css/style.css';
import '../images/font-awesome/css/font-awesome.min.css'

class SidebarExample extends React.Component {
  constructor(props) {
    super(props);
    let open = false

    let user = null
    if (localStorage.getItem('user') !== "undefined") {
      user = JSON.parse(localStorage.getItem('user'))
    }

    this.state = {
      open: open,
      username: user ? user.username : null
    }

  }
  componentWillMount() {
    //NProgress.start()
  }

  componentDidMount() {
    //NProgress.done()
  }


  handleDrawerOpen = () => {
    this.setState({ open: true });
    //console.log("main.handleDrawerOpen.open:"+this.state.open)
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
    //console.log("main.handleDrawerClose.close:"+this.state.open)
  }

  handleToggleShade = (event) => {
    this.props.toggleTheme()
    //this.props.dispatch({ type: 'TOGGLE_THEME_SHADE' });
  }

  lLogin = (event) => {
    this.props.login(config).then(result => {
      console.log('token: ' + JSON.stringify(result.token))
      console.log('expiresAt: ' + JSON.stringify(result.expiresAt))
      localStorage.setItem('userToken', result.token)

      this.props.getLocalUserInfo().then(data => {
        //console.log('user: ' + JSON.stringify(data))
        localStorage.setItem('user', JSON.stringify(data))
        if (data) {
          this.setState({
            username: data.username
          })
        }
      })
    }, function (e) {
      console.log(e); // TypeError: Throwing
    })
  }

  lLogout = (event) => {
    console.log('logout2')
    this.props.logout().then(result => {
      localStorage.removeItem('userToken')
      localStorage.removeItem('user')
      this.setState({
        username: null
      })
    })
  }

  render() {

    return (
      <div >
        <div
          onRequestClose={this.handleDrawerClose}
          //onClick={!isWidthUp('lg', width) && this.handleDrawerClose}
          open={this.state.open}
        >
          <Header />
        </div>
        <main>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} exact={route.exact} {...route} />
          ))}
          {routese.map((route, index) => (
            // Render more <Route>s with the same paths as
            // above, but different components this time.
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </main>
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}

SidebarExample.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  //isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn
})

export default compose(
  withRouter,
  connect(mapStateToProps, {
    login,
    logout,
    getLocalUserInfo,
    toggleTheme
  })
)(SidebarExample)
