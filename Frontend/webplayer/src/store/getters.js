const getters = {
    getAlbumsGetter: function (state) {
        return state.albums
    },

    getCoversGetter: (state)=> state.covers,
    getCurrentAlbumGetter: (state)=> state.currentAlbum,


    // kolejne gettery...

}

export default getters
