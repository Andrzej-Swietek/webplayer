import axios from 'axios'
// axios.defaults.baseURL = '//localhost:3000/';
const querystring = require('querystring');

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

    async getPlaylist({commit}){
        const res = await axios.post('http://localhost:3000/', querystring.stringify({ albumName: 'playlist' }) );
        commit('UPDATE_PLAYLIST', res.data)
    },

    async addToPlayList({ dispatch },payload){
        const res = await axios.post('http://localhost:3000/', querystring.stringify({ addToPlaylist: true, album: payload.album, name: payload.name, size: payload.size }) );
        console.log("DODANO:  ", res.data)
        dispatch('getPlaylist')
    },

    async fetchCoversUploaded({commit}) {
        const res = await axios.post('http://localhost:3000/getUploaded', querystring.stringify({ coversRequest: true }) );
        commit('UPLOADED_COVERS_MUTATIONS', res.data)
    },

    async fetchAlbumNameUploaded({commit}){
        const res = await axios.post('http://localhost:3000/getUploaded', querystring.stringify({ albumName: this.state.req }) );
        commit('UPLOADED_ALBUMS_MUTATION', res.data)
    },
}

export default actions
