import axios from 'axios'

const actions = {
    fetchApiAction({ commit }) {
        axios.get('http://localhost:3000/api')
            .then(response => {
                commit('ALBUMS_MUTATION', response.data)
            })
    },
    // kolejne akcje, jeśli potrzebne
}

export default actions
