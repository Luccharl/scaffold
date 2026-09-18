const BASE_URL = 'http://127.0.0.1:8000/api/notes'

async function handleResponse(response) {
    if (!response.ok) {
        const errorBody = await response.json().catch(() => null)
        throw new Error(errorBody?.message || `Request failed: ${response.status}`)
    }
    if (response.status === 204) return null
    return response.json()
}

export default {
    getAll() {
        return fetch(BASE_URL).then(handleResponse)
    },

    get(id) {
        return fetch(`${BASE_URL}/${id}`).then(handleResponse)
    },

    create(note) {
        return fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(note),
        }).then(handleResponse)
    },

    update(id, note) {
        return fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(note),
        }).then(handleResponse)
    },

    remove(id) {
        return fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        }).then(handleResponse)
    },
}