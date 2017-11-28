import client from './'

const url = "/api-hotel/reserva/"
export const RESERVA_LIST = "RESERVA_LIST"
export const reservaList = (list) => (
    {
        type: RESERVA_LIST,
        list
    }
)

export const RESERVA_LIST_FAILURE = 'RESERVA_LIST_FAILURE'
export const reservaListFailure = error => ({
    type: RESERVA_LIST_FAILURE,
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
            dispatch(reservaList(r.data))
        }).catch(error => {
            //throw (error)
            //console.log('getList catch:' + JSON.stringify(error.response))
            if (error.response) {
                dispatch(reservaListFailure(error.response.data.detail))
            } else if (error.request) {
                console.log(error.request);
                dispatch(reservaListFailure(JSON.stringify('Error ' + error.request)))
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                dispatch(reservaListFailure('Error ' + error.message))
            }
            //console.log(error.config);

        })
    }
}


export const RESERVA_ADD = "RESERVA_ADD"
export const reservaAdd = () => (
    {
        type: RESERVA_ADD,
    }
)
export const save = (d, h) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                client.post(url, d).then(r => {
                    dispatch(reservaAdd())
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
export const RESERVA_UPDATE = "RESERVA_UPDATE"
export const reservaUpdate = () => (
    {
        type: RESERVA_UPDATE,
    }
)
export const update = (d, h) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                client.put(`${url}${d.id}/`, d).then(r => {
                    dispatch(reservaUpdate())
                    resolve(h)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}

export const RESERVA_DELETE = "RESERVA_DELETE"
export const reservaDelete = (data) => (
    {
        type: RESERVA_DELETE,
        data
    }
)

export const del = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                client.delete(`${url}${id}`).then(r => {
                    dispatch(reservaDelete(id))
                    resolve(r)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}