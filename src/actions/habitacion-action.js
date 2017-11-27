import client from './'

const url = "/api-hotel/habitaciones/"
export const HABITACION_LIST = "HABITACION_LIST"
export const habitacionList = (list) => (
    {
        type: HABITACION_LIST,
        list
    }
)

export const HABITACION_LIST_FAILURE = 'HABITACION_LIST_FAILURE'
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
            dispatch(habitacionList(r.data))
        }).catch(error => {
            //throw (error)
            //console.log('getList catch:' + JSON.stringify(error.response))
            if (error.response) {
                dispatch(habitacionListFailure(error.response.data.detail))
            } else if (error.request) {
                console.log(error.request);
                dispatch(habitacionListFailure(JSON.stringify('Error ' + error.request)))
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                dispatch(habitacionListFailure('Error ' + error.message))
            }
            //console.log(error.config);

        })
    }
}


export const HABITACION_ADD = "HABITACION_ADD"
export const habitacionAdd = () => (
    {
        type: HABITACION_ADD,
    }
)
export const save = (d, h) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                client.post(url, d).then(r => {
                    dispatch(habitacionAdd())
                    resolve(h)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}


export const getById = (id) => {
    return (dispatch) => {
        return client.get(`${url}${id}`).then(r => {
            return r.data
        })
    }
}
export const HABITACION_UPDATE = "HABITACION_UPDATE"
export const habitacionUpdate = () => (
    {
        type: HABITACION_UPDATE,
    }
)
export const update = (d, h) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                client.put(`${url}${d.id}/`, d).then(r => {
                    dispatch(habitacionUpdate())
                    resolve(h)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}

export const HABITACION_DELETE = "HABITACION_DELETE"
export const habitacionDelete = (data) => (
    {
        type: HABITACION_DELETE,
        data
    }
)

export const del = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                client.delete(`${url}${id}`).then(r => {
                    dispatch(habitacionDelete(id))
                    resolve(r)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}
