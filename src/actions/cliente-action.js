import client from './'

const url = "/api-hotel/clientes/"
export const CLIENTE_LIST = "CLIENTE_LIST"
export const clienteList = (list) => (
    {
        type: CLIENTE_LIST,
        list
    }
)

export const CLIENTE_LIST_FAILURE = 'CLIENTE_LIST_FAILURE'
export const clienteListFailure = error => ({
    type: CLIENTE_LIST_FAILURE,
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
            dispatch(clienteList(r.data))
        }).catch(error => {
            //throw (error)
            //console.log('getList catch:' + JSON.stringify(error.response))
            if (error.response) {
                dispatch(clienteListFailure(error.response.data.detail))
            } else if (error.request) {
                console.log(error.request);
                dispatch(clienteListFailure(JSON.stringify('Error ' + error.request)))
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                dispatch(clienteListFailure('Error ' + error.message))
            }
            //console.log(error.config);

        })
    }
}


export const CLIENTE_ADD = "CLIENTE_ADD"
export const clienteAdd = () => (
    {
        type: CLIENTE_ADD,
    }
)
export const save = (d, h) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                client.post(url, d).then(r => {
                    dispatch(clienteAdd())
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
export const CLIENTE_UPDATE = "CLIENTE_UPDATE"
export const clienteUpdate = () => (
    {
        type: CLIENTE_UPDATE,
    }
)
export const update = (d, h) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                client.put(`${url}${d.id}/`, d).then(r => {
                    dispatch(clienteUpdate())
                    resolve(h)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}

export const CLIENTE_DELETE = "CLIENTE_DELETE"
export const clienteDelete = (data) => (
    {
        type: CLIENTE_DELETE,
        data
    }
)

export const del = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                client.delete(`${url}${id}`).then(r => {
                    dispatch(clienteDelete(id))
                    resolve(r)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}
