import axios from 'axios'
// axios.defaults.baseURL = '//localhost:3000/';
var querystring = require('querystring');

const actions = {
    async fetchApiAction({ commit }) {
        const response = await axios.get('http://localhost:3000/api');
        commit('ALBUMS_MUTATION', response.data);
    },

    // kolejne akcje, jeśli potrzebne
    // async fetchCovers({commit}) {
    //     const res = await axios.post('http://localhost:3000/', { coversRequest: true });
    //     commit('COVERS_MUTATIONS', res.data)
    // }
    async fetchCovers({commit}) {
        const res = await axios.post('http://localhost:3000/', querystring.stringify({ coversRequest: true }) );
        commit('COVERS_MUTATIONS', res.data)

    }

    // ========= GET COVERS =========
    // async fetchCovers({commit}) {
    //     const res = await axios.get('http://localhost:3000/tmp');
    //
    //     commit('COVERS_MUTATIONS', res.data)
    // }

}

export default actions
