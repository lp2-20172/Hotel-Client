import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { getList } from '../../../actions/categoria-action'
import { connect } from 'react-redux'
import {
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom'
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: 'http://rossello-barcelona.eveniahotels.com/wp-content/uploads/2013/12/Family.jpg',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: 'http://www.ochoalacar.com/wp-content/uploads/2016/12/ba%C3%B1o-roca.jpeg',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: 'https://st.hzcdn.com/simgs/3e01c10a005769a5_4-3462/modern-balcony.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];


class List extends Component {
  componentWillMount() {
    this.props.getList("")
  }
  render() {
    let { list } = this.props
    if (list) {

    } else {
      list = []

    }

    return (
      <div >
         { list.map((d, index) =>
        <div className="habitacion habitacion_info" >
          <div className="img img_info">
            <UncontrolledCarousel items={items} />
          </div>
          <div className="info_rooms">
            <div className="info info_reserva">
              <h3>
              {d.nombre}
                     </h3>
              <p>
                S/{d.precio}
                     </p>
              <p>
                <NavLink exact to="/form" activeClassName="selected">Reservar</NavLink>
              </p>
            </div>
          </div>
          <div className="informance">
            <p> {d.descripcion}</p>
          </div>
        </div>
      )}
      </div>
    );
  }
}
List.propTypes = {
  list: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    list: state.categoria.list
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getList: (q) => { dispatch(getList(q)) },
  }
}

export default connect(mapStateToProps, {
  getList,

})(List)