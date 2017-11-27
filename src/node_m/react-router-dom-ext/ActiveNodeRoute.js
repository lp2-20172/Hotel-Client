import find from 'lodash/find';
import { matchPath } from 'react-router'

import pageToTitle from './Title'


const findActiveNodeRoute = (currentPages, url, countParent = 0, title = { "parent": '', "children": '' }) => {
    const activePage = find(currentPages, page => {
      if (page.routes) {
  
        const mp = matchPath(url.pathname, page)
        if (mp) {
          
          if (title.parent) {
            title.parent = title.parent + ' > ' + pageToTitle(page)
          }else {
            title.parent = pageToTitle(page)
          }
          countParent++
        }
  
        return mp
      }
      const mpc = matchPath(url.pathname, page)
      if (mpc) {
        title.children = pageToTitle(page)
      }
      return mpc
    })
    if (!activePage) {
      return { activePage: null, title: { "parent": '', "children": '' } }
    }

    if (!matchPath(url.pathname, {
      path: activePage.path,
      exact: true,
      strict: false
    })
  
    ) {
      return findActiveNodeRoute(activePage.routes, url, countParent, title)
    }
  
    return { activePage, title }
  }

  export default findActiveNodeRoute
  
 