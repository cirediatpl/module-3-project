class Adapter {

    constructor(BASE_URL) {
        this.baseURL = BASE_URL
    }

    options(method, body){
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(body)
        }
    }

    getAppointments(status) {
        return fetch(`${this.baseURL}/appointments?status=${status}`).then(r => r.json())
    }

    patchAppointment(id, body) {
        return fetch(`${this.baseURL}/appointments/${id}`, this.options('PATCH', body)).then(r => r.json())
    }

}