import person from './'

const url = "/api-core/persons/"
export const PERSON_LIST = "PERSON_LIST"
export const personList = (list) => (
    {
        type: PERSON_LIST,
        list
    }
)

export const PERSON_LIST_FAILURE = 'PERSON_LIST_FAILURE'
export const personListFailure = error => ({
    type: PERSON_LIST_FAILURE,
    error
})

export const getList = (q = '') => {
    let params = {
        params: {
            query: q
        }
    }
    return (dispatch) => {
        person.get(url, params).then(r => {
            dispatch(personList(r.data))
        }).catch(error => {
            //throw (error)
            //console.log('getList catch:' + JSON.stringify(error.response))
            if (error.response) {
                dispatch(personListFailure(error.response.data.detail))
            } else if (error.request) {
                console.log(error.request);
                dispatch(personListFailure(JSON.stringify('Error ' + error.request)))
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                dispatch(personListFailure('Error ' + error.message))
            }
            //console.log(error.config);

        })
    }
}


export const PERSON_ADD = "PERSON_ADD"
export const personAdd = () => (
    {
        type: PERSON_ADD,
    }
)
export const save = (d, h) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                person.post(url, d).then(r => {
                    dispatch(personAdd())
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
        return person.get(`${url}${id}`).then(r => {
            return r.data
        })
    }
}

export const PERSON_UPDATE = "PERSON_UPDATE"
export const personUpdate = () => (
    {
        type: PERSON_UPDATE,
    }
)
export const update = (d, h) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                person.put(`${url}${d.id}/`, d).then(r => {
                    dispatch(personUpdate())
                    resolve(h)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}

export const PERSON_DELETE = "PERSON_DELETE"
export const personDelete = (data) => (
    {
        type: PERSON_DELETE,
        data
    }
)

export const del = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                person.delete(`${url}${id}`).then(r => {
                    dispatch(personDelete(id))
                    resolve(r)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}