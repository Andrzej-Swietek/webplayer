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
    getTimer: (state) => state.timer

    // kolejne gettery...

}

export default getters
