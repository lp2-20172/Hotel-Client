import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getList } from '../../actions/habitacion-action'
import { connect } from 'react-redux'

import {
    Link,
    NavLink
} from 'react-router-dom'


class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            q: "",
        }
    }

    componentWillMount() {
        this.props.getList(this.state.q)
    }
    change = (e) => {
        const q = e.target.value
        console.log("q:" + q)
        this.props.getList(q)
    }
    handleClick = () => {
        this.props.history.push('/catalogo/habitacion/new');
    }
    handleInputChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value
        })
        this.props.getList(this.state.q)
    }
    render() {
        let { list } = this.props
        if (list) {

        } else {
            list = []

        }

        return (
            <div className=" contenedor contenedor_habitacion" key="Subheader" >
                {list.map((d, index) =>
                    <div className="habitacion" key={index}>
                        <div className="img-habitacion">
                            <img src={d.foto} alt={d.tipo_habitacion} />
                        </div>
                        <div className="info_rooms">
                            <div className="info">
                                <h3>
                                    {d.tipo_habitacion}
                                </h3>
                            </div>
                            <div className="info info_color">
                                <Link to={`/catalogo/habitacion/edit/:id${d.id}`}>Mas informacion</Link>
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
List.propTypes = {
    list: PropTypes.array
}
const mapStateToProps = (state) => {
    return { list: state.habitacion.list }
}
export default connect(mapStateToProps, {
    getList,
    
})(List)
