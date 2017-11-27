import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getList } from '../../actions/habitacion-action'
import { connect } from 'react-redux'

import {
    Link,
    NavLink
} from 'react-router-dom'


class Habitacion extends Component {
    componentWillMount() {
        this.props.getList("")
}
    render() {
        let { list} = this.props
        if (list) {

        } else {
            list = []

        }

        return (
            <div className=" contenedor contenedor_habitacion" key="Subheader" >
                   { list.map((d, index) =>
                    <div className="habitacion" key={d.foto}>
                        <div className="img-habitacion">
                            <img src={d.foto} alt={d.tipoHabitacion} />
                        </div>
                        <div className="info_rooms">
                            <div className="info">
                                <h3>
                                    {d.tipoHabitacion}
                                </h3>
                            </div>
                            <div className="info info_color">
                                <NavLink exact to="/informations" activeClassName="selected"><h3>Mas informacion</h3></NavLink>
                                <p>
                                    <Link exact to="/form" activeClassName="selected">Reservar</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        );
    }
}
Habitacion.propTypes = {
    list: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        list: state.habitacion.list
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getList: (q) => { dispatch(getList(q)) },  
    }
}

export default connect(mapStateToProps, {
     getList,
    
})(Habitacion)
