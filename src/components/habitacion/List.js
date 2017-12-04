import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getList, del } from '../../actions/habitacion-action'
import {
    Link
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
        
        let { list, del } = this.props
        if (list === null) {
            list = []
        }
        return (
            <div className=" contenedor contenedor_habitacion" key="Subheader" >
            {list.map((d, index) =>
                <div className="habitacion" key={index}>
                    <div className="img-habitacion">
                        <img src={d.foto} alt={d.nombre} />
                    </div>
                    <div className="info_rooms">
                        <div className="info">
                            <h3>
                                {d.nombre}
                            </h3>
                        </div>
                        <div className="info info_color">
                            <Link to={`/catalogo/habitacion/edit/${d.id}`}>Mas informacion</Link>
                            <p>
                                <Link exact to="/person/form" activeClassName="selected">Reservar</Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
        )
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
    del
})(List)