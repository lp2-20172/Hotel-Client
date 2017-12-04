import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { save, getById, update } from '../../actions/cliente-action'
import { connect } from 'react-redux'

import {
    Link,
    NavLink
} from 'react-router-dom'

class Cliente extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.data ? props.data.id : null,
            nombre: props.data ? props.data.nombre : '',
            apellido_paterno: props.data ? props.data.apellido_paterno : '',
            apellido_materno: props.data ? props.data.apellido_materno : '',
            direccion: props.data ? props.data.direccion : '',
            edad: props.data ? props.data.edad : '',
            dni: props.data ? props.data.dni : '',
            email: props.data ? props.data.email : ''
        }/*
        this.state = {
            id:  null,
            codigo:'',
            nombre: ''
        }*/
    }
    /*
        componentWillReceiveProps = (nextProps) => { // Load Asynchronously
            const { data } = nextProps;
            console.log('componentWillReceiveProps data:' + JSON.stringify(data))
            this.setState({
                id: data.id,
                codigo: data.codigo,
                nombre: data.nombre
            })
        }
    */
    componentWillMount = () => {
        /*
        const { id } = this.props.match.params
        if (id) {
            //this.props.getById(id)
            //this.props.getItemAsync(id)
            this.props.getById(id).then(data => {
                console.log('componentWillReceiveProps data:' + JSON.stringify(data))
                this.setState({
                    id: data.id,
                    codigo: data.codigo,
                    nombre: data.nombre
                })
            }).catch(e => {
            });
        }
        */
    }

    componentDidMount() {
        const { id } = this.props.match.params
        if (id) {
            this.props.getById(id).then(data => {
                this.setState({
                    id: data.id,
                    nombre: data.nombre,
                    apellido_paterno: data.apellido_paterno,
                    apellido_materno: data.apellido_materno,
                    direccion: data.direccion,
                    edad: data.edad,
                    dni: data.dni,
                    email: data.email
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

        const { id } = this.props.match.params
        if (id) {
            this.props.update(this.state, this.props.history).then(r => {
                r.push('/hotel/cliente2/list')
            }, error => {
                throw (error)
            })
        } else {
            this.props.save(this.state, this.props.history).then(r => {
                r.push('/reserva/form')
            }, error => {
                throw (error)
            })
        }
    }


    render() {
        return (
            <div className="imgbackground portada">
                <div className="reserva">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" className="form2" placeholder="Nombre"
                            value={this.state.nombre}
                            onChange={this.handleInputChange}
                            name="nombre" />
                        <input type="text" className="form2" placeholder="Apellido Paterno"
                            value={this.state.apellido_paterno}
                            onChange={this.handleInputChange}
                            name="apellido_paterno" />
                        <input type="text" className="form2" placeholder="Apellido Materno"
                            value={this.state.apellido_materno}
                            onChange={this.handleInputChange}
                            name="apellido_materno" />
                        <input type="text" className="form2" placeholder="Direccion"
                            value={this.state.direccion}
                            onChange={this.handleInputChange}
                            name="direccion" />
                        <input type="text" className="form2" placeholder="Edad"
                            value={this.state.edad}
                            onChange={this.handleInputChange}
                            name="edad" />
                        <input type="text" className="form2" placeholder="DNI" maxLength='8'
                            value={this.state.dni}
                            onChange={this.handleInputChange}
                            name="dni" />
                        <input type="text" className="form2" placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            name="email" />
                        <input type="submit" className="form2btn" value="Enviar" />
                    </form>

                </div>

            </div>
        );
    }
}


Cliente.propTypes = {
    data: PropTypes.object
}

const mapStateToProps = (state, props) => {
    if (props.match.params.id) {
        return {
            data: state.cliente.list.find(item => item.id + '' === props.match.params.id + '')
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

})(Cliente)