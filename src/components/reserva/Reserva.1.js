import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import Calendar from 'react-calendar';
import { getById, save, update } from '../../actions/reserva-action'
import { getList as getPersonList } from '../../actions/person-action'
import { connect } from 'react-redux'
//import DateTimeField from 'reactstrap'
import moment from 'moment';
import 'moment/locale/es';

class Reserva extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.data ? props.data.id : null,
            costo_alojamiento: props.data ? props.data.costo_alojamiento : '',
            tipo_reserva: props.data ? props.data.tipo_reserva : '',
            person: props.data ? props.data.person : '',
            estado: props.data ? props.data.estado : false,
            fecha_ingresa: props.data ? props.data.fecha_ingresa : '',
            fecha_salida: props.data ? props.data.fecha_salida : '',
            f: props.data ? moment(props.data.fecha_ingresa, 'YYYY-MM-DD hh:mm A') : moment().format('YYYY-MM-DD hh:mm A')
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
                    costo_alojamiento: data.costo_alojamiento,
                    person: data.person,
                    estado: data.estado,
                    fecha_ingresa: data.fecha_ingresa,
                    fecha_salida: data.fecha_salida,
                    f: moment(data.fecha_ingresa, 'YYYY-MM-DD hh:mm A'),
                });
            });
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleChangedate = (newDate) => {
        return this.setState({ f: newDate });
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log('d=' + JSON.stringify(this.state))

        const { id } = this.props.match.params
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
            <div div className="imgbackground portada">
                <div className="reserva">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" className="form2" placeholder="Costo"
                            value={this.state.costo_alojamiento}
                            onChange={this.handleInputChange}
                            name="costo_alojamiento" />
                        <input type="text" className="form2" placeholder="Tipo Reserva"
                            value={this.state. tipo_reserva}
                            onChange={this.handleInputChange}
                            name=" tipo_reserva" />
                        <div>Fecha Ingresa</div>
                        <input
                        className="form2"
                            type="date"
                            dateTime={this.state.f}
                            format="YYYY-MM-DD hh:mm A"
                            name="f"
                            inputFormat="YYYY-MM-DD hh:mm A"
                            onChange={this.handleChangedate}
                        />
                        <div>Fecha Salidad</div>
                        <input
                        className="form2"
                            type="date"
                            dateTime={this.state.f}
                            format="YYYY-MM-DD hh:mm A"
                            name="f"
                            inputFormat="YYYY-MM-DD hh:mm A"
                            onChange={this.handleChangedate}
                        />

                        <div>Cliente</div>
                        <select className="form2"
                            componentClass="select"
                            placeholder="Seleccione un cliente"
                            value={this.state.person}
                            name="cliente"
                            required="required"
                            onChange={this.handleChange}
                        >
                            <option value="" disabled>Seleccione una opcion...</option>
                            {person_list.map((d, index) =>
                                <option key={index}
                                    value={d.id}>{d.nombre} {d.apellido_paterno} {d.apellido_materno}</option>
                            )}
                        </select>

                        <input
                        className="form2"
                            type="checkbox"
                            value={this.state.estado}
                            name="estado"
                            onChange={this.handleChange} />
                        ¿estado? {this.state.estado ? "SI" : "NO"}
                        <Button type="reset"
                            onClick={(e) => this.props.history.push('/catalogo/reservas/list')}><i
                                className="fa fa-undo" /> Cancelar</Button>
                        {'  '}
                        <Button type="submit" bsStyle="primary" onClick={this.handleSubmit}><i
                            className="fa fa-save" /> Guardar</Button>

                    </form>
                </div>
            </div>
        )
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