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


const nombres = [
    ['Juan'],
    ['Pepe'],
    ['Lucho'],
    ['Juana'],
    ['Dienton'],
    ['Luchito'],

];

const limit = 3;
const pageCount = 3;
const total = nombres.length * limit;

class Nombre extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1
        };
    }
    handlePageChange = page => {
        this.setState({
            currentPage: page
        });
    };

    render() {
        const { currentPage } = this.state;
        return (
            <div>
               
                <div className="container">
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Nombres</th>
                        </tr>
                    </thead>
                   
                        <tbody >
                            <tr>
                            {nombres[currentPage - 1].map(item => <li key={item}>{item}</li>)}                               
                            </tr>
                        </tbody>
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


export default (Nombre)