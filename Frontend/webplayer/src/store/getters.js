const getters = {
    getAlbumsGetter: function (state) {
        return state.albums
    },

    getCoversGetter: (state)=> state.covers,
    getCurrentAlbumGetter: (state)=> state.currentAlbum,
    getReq: (state)=> state.req,

    // kolejne gettery...

}

export default getters
