import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { save, getById, update } from '../../actions/habitacion-action'

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


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.data ? props.data.id : null,
            precio_diario: props.data ? props.data.precio_diario : '',
            tipo_habitacion: props.data ? props.data.tipo_habitacion : '',
            descripcion: props.data ? props.data.descripcion : ''
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params
        if (id) {
            this.props.getById(id).then(data => {
                this.setState({
                    id: data.id,
                    precio_diario: data.precio_diario,
                    tipo_habitacion: data.tipo_habitacion,
                    descripcion: data.descripcion
                });
            });
        }

    }

    handleSubmit = event => {
        event.preventDefault()
        console.log('d=' + JSON.stringify(this.state))

        const { id } = this.props.match.params
        if (id) {
            this.props.update(this.state, this.props.history).then(r => {
                r.push('/catalogo/categorias/list')
            }, error => {
                throw (error)
            })
        } else {
            this.props.save(this.state, this.props.history).then(r => {
                r.push('/catalogo/categorias/list')
            }, error => {
                throw (error)
            })
        }
    }

    render() {
        //console.log(JSON.stringify(this.props))
        //const { list } = this.props
        return (
            <div>
                <div className="habitacion habitacion_info" >
                    <div className="img img_info">
                        <UncontrolledCarousel items={items} />
                    </div>
                    <div className="info_rooms" onSubmit={this.handleSubmit}>
                        <div className="info info_reserva">
                            <input readonly="readonly" className="input_text"
                                value={this.state.precio_diario} />
                            <input readonly="readonly" className="input_text"
                                value={this.state.tipo_habitacion}
                            />
                            <p>
                                <NavLink exact to="/person/form" activeClassName="selected">Reservar</NavLink>
                            </p>
                        </div>
                        <div className="informance">
                            <textarea type="text" readonly="readonly" className="input_text informance_input"
                                value={this.state.descripcion}
                            />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
Form.propTypes = {
    data: PropTypes.object
}

const mapStateToProps = (state, props) => {
    if (props.match.params.id) {
        return {
            data: state.habitacion.list.find(item => item.id + '' === props.match.params.id + '')
        }
    }
    return {
        data: null
    }

}
export default connect(mapStateToProps, {
    save,
    getById,
    update
})(Form)
