//import axios from "axios";

import client from './'

//https://github.com/brandiqa/redux-crud-example/blob/master/src/actions/contact-actions.js#L22

const url = '/api-hotel/habitaciones/'

export const HABITACION_LIST_REQUEST = "HABITACION_LIST_REQUEST"
export const HABITACION_LIST_SUCCESS = 'HABITACION_LIST_SUCCESS'
export const HABITACION_LIST_FAILURE = 'HABITACION_LIST_FAILURE'


export const habitacionListSuccess = (list) => ({
    type: HABITACION_LIST_SUCCESS,
    list
})

export const habitacionListFailure = error => ({
    type: HABITACION_LIST_FAILURE,
    error
})



export const getList = (q = '') => {
    let params = {
        params: {
            query: q
        }
    }
    return (dispatch) => {
        client.get(url, params).then(r => {
            dispatch(habitacionListSuccess(r.data))
        }).catch(error => { //throw (error)
            //console.log('getList catch:' + JSON.stringify(error.response))
            if (error.response) {
                dispatch(habitacionListFailure(error.response.data.detail))
            } else if (error.request) {
                console.log(error.request);
                dispatch(habitacionListFailure(JSON.stringify('Error '+error.request)))
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                dispatch(habitacionListFailure('Error '+error.message))
            }
            //console.log(error.config);
        })
    }
}

