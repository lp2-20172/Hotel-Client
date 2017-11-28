import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getList } from '../../actions/habitacion-action'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import Pagination from 'react-paginating'

///
import { Table } from 'reactstrap'


import {
    Link,
    NavLink
} from 'react-router-dom'


const list = [
    [PropTypes.array],

];

const limit = 1;
const pageCount = 1;
const total = list.length * limit;

class Paginacion extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1
        };
    }

    componentWillMount() {
        this.props.getList("")
    }

    handlePageChange = page => {
        this.setState({
            currentPage: page
        });
    };

    render() {
        const { currentPage } = this.state;
        let { list } = this.props
        if (list) {

        } else {
            list = []

        }
        return (
            <div>
               
                <div className="container">
                <Table bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Numero</th>
                            <th>Piso</th>
                            <th>Precio</th>
                            <th>Tipo Habitacion</th>
                            <th>Caracteristicas</th>
                            <th>Descripcion</th>
                        </tr>
                    </thead>
                    {list.map((d, index) =>
                        <tbody key={index}>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <th scope="row">{d.numero}</th>
                                <th scope="row">{d.piso}</th>
                                <th scope="row">{d.precio_diario}</th>
                                <th scope="row">{d.tipo_habitacion}</th>
                                <th scope="row">{d.caracteristicas}</th>
                                <th scope="row">{d.descripcion}</th>
                                
                            </tr>
                        </tbody>
                    )}
                </Table>
                <Pagination
                    total={total}
                    limit={limit}
                    pageCount={pageCount}
                    currentPage={currentPage}
                >
                    {({
                        pages,
                        currentPage,
                        hasNextPage,
                        hasPreviousPage,
                        previousPage,
                        nextPage,
                        totalPages,
                        getPageItemProps
                            }) => (
                            <div>
                                <button
                                    {...getPageItemProps({
                                        pageValue: 1,
                                        onPageChange: this.handlePageChange
                                    }) }
                                >
                                    first
                                </button>

                                {hasPreviousPage && (
                                    <button
                                        {...getPageItemProps({
                                            pageValue: previousPage,
                                            onPageChange: this.handlePageChange
                                        }) }
                                    >
                                        {'<'}
                                    </button>
                                )}

                                {pages.map(page => {
                                    let activePage = null;
                                    if (currentPage === page) {
                                        activePage = { backgroundColor: '#fdce09' };
                                    }
                                    return (
                                        <button
                                            key={page}
                                            style={activePage}
                                            {...getPageItemProps({
                                                pageValue: page,
                                                onPageChange: this.handlePageChange
                                            }) }
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                                {hasNextPage && (
                                    <button
                                        {...getPageItemProps({
                                            pageValue: nextPage,
                                            onPageChange: this.handlePageChange
                                        }) }
                                    >
                                        {'>'}
                                    </button>
                                )}

                                <button
                                    {...getPageItemProps({
                                        pageValue: totalPages,
                                        onPageChange: this.handlePageChange
                                    }) }
                                >
                                    last
                                </button>
                            </div>
                        )}
                </Pagination>
                </div>
            
            </div>
        );
    }
}
Paginacion.propTypes = {
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

})(Paginacion)