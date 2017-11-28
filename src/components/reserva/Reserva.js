import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { getById, save, update } from '../../actions/reserva-action'
import { getList as getPersonList } from '../../actions/person-action'
import { connect } from 'react-redux'

import moment from 'moment';
import 'moment/locale/es';

import {
    Link,
    NavLink
} from 'react-router-dom'

class Reserva extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.data ? props.data.id : null,
            costo_alojamiento: props.data ? props.data.costo_alojamiento : '',
            tipo_reserva: props.data ? props.data.tipo_reserva : '',
            person: props.data ? props.data.person : false,
            estado: props.data ? props.data.estado : false,
            
        }
    }


    componentWillMount = () => {
        this.props.getPersonList("")
    }

    componentDidMount = () => {
        const { id } = this.props.match.params
        if (id) {
            this.props.getById(id).then(data => {
                this.setState({
                    id: data.id,
                    costo_alojamiento: data.costo_alojamiento,
                    tipo_reserva: data.tipo_reserva,
                    person: data.person,
                    estado: data.estado,
                   

                });
            });
        }
    }

    handleInputChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value
        })

    }


    handleSubmit = event => {
        event.preventDefault()
        console.log('d=' + JSON.stringify(this.state))

        const { id } = this.props.match.params;
        this.state.fecha_ingresa = moment(this.state.f)
        if (id) {
            this.props.update(this.state, this.props.history).then(r => {
                r.push('/hotel/person2/list')
            }, error => {
                throw (error)
            })
        } else {
            this.props.save(this.state, this.props.history).then(r => {
                r.push('/home')
            }, error => {
                throw (error)
            })
        }
    }



    render() {
        let { person_list } = this.props
        return (
            <div className="imgbackground portada">
                <div className="reserva">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" className="form2" placeholder="Costo"
                            value={this.state.costo_alojamiento}
                            onChange={this.handleInputChange}
                            name="costo_alojamiento" />
                        <input type="text" className="form2" placeholder="Tipo Reserva"
                            value={this.state.tipo_reserva}
                            onChange={this.handleInputChange}
                            name="tipo_reserva" />
                        <div>Cliente</div>
                        <Input type="select"
                            value={this.state.person}
                            name="person"
                            required="required"
                            onChange={this.handleInputChange}
                        >

                            {person_list.map((d, index) =>
                                <option key={index}
                                    value={d.id}>{d.nombre} {d.apellido_paterno} {d.apellido_materno}</option>
                            )}
                        </Input>
                        <input
                            className="form2"
                            type="checkbox"
                            value={this.state.estado}
                            name="estado"
                            onChange={this.handleInputChange} />

                        <input type="submit" className="form2btn" value="Reservar" />

                    </form>

                </div>

            </div>
        );
    }
}


Reserva.propTypes = {
    data: PropTypes.object,
    person_list: PropTypes.array,

}

const mapStateToProps = (state, props) => {
    if (props.match.params.id) {
        return {
            data: state.reserva.list.find(item => item.id + '' === props.match.params.id + ''),
            person_list: state.person.list,
        }
    }
    return {
        data: null,
        person_list: state.person.list,

    }

}

export default connect(mapStateToProps, {
    save,
    getById,
    update,
    getPersonList,
})(Reserva)