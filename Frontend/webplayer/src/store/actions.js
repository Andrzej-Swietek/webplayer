import axios from 'axios'
// axios.defaults.baseURL = '//localhost:3000/';
var querystring = require('querystring');

const actions = {
    async fetchApiAction({ commit }) {
        const response = await axios.get('http://localhost:3000/api');
        commit('ALBUMS_MUTATION', response.data);
    },


    async fetchCovers({commit}) {
        const res = await axios.post('http://localhost:3000/', querystring.stringify({ coversRequest: true }) );
        commit('COVERS_MUTATIONS', res.data)
    },

    async fetchFirst({commit}) {
        const res = await axios.post('http://localhost:3000/', querystring.stringify({ albumName: 'first' }) );
        commit('FIRST_MUTATIONS', res.data)
    },

    async fetchAlbumName({commit}){
        const res = await axios.post('http://localhost:3000/', querystring.stringify({ albumName: this.state.req }) );
        commit('FIRST_MUTATIONS', res.data)
    },

    async fetchNextSong({commit}){
        const res = await axios.post('http://localhost:3000/', querystring.stringify({ albumName: this.state.req }) );
        commit('FIRST_MUTATIONS', res.data)
    },

    // async addToPlayList({commit}){
        // const res = await axios.post('http://localhost:3000/', querystring.stringify({ addToPlaylist: true, album: album, name: name, size: size }) );
        // commit('FIRST_MUTATIONS', res.data)
    // },
}

export default actions
