import axios from 'axios'
// axios.defaults.baseURL = '//localhost:3000/';
const actions = {
    async fetchApiAction({ commit }) {
        const response = await axios.get('http://localhost:3000/api');
        commit('ALBUMS_MUTATION', response.data);
    },
    // kolejne akcje, jeśli potrzebne
    async fetchCovers({commit}) {
        const res = await axios.post('http://localhost:3000/', { coversRequest: true });
        commit('COVERS_MUTATIONS', JSON.parse(res.data))
    }

}

export default actions
