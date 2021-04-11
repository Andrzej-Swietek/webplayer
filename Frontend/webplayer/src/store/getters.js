const getters = {
    getAlbumsGetter: function (state) {
        return state.albums
    },

    getCoversGetter: (state)=> state.covers,
    getCurrentAlbumGetter: (state)=> state.currentAlbum,
    getReq: (state) => state.req,
    getNowPlaying: (state) => state.nowPlaying,
    isPlayingNow: (state) => state.isPlaying,
    getPlaylist: (state) => state.playlist,
    getTimer: (state) => state.timer,

    getUploadedAlbums: (state) => state.uploadedAlbums,
    getUploadedCovers: (state) => state.uploadedCovers,
    getShouldUploadedBeShown: (state) => state.shouldUploadedBeShown

    // kolejne gettery...

}

export default getters
