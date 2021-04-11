// Zmiany w state

const mutations = {

    ALBUMS_MUTATION(state, albums) {
        state.albums = albums
    },
    // kolejne mutations

    COVERS_MUTATIONS(state, covers){
        state.covers = covers
    },

    FIRST_MUTATIONS(state, album){
        state.currentAlbum = album
    },

    REQ(state, album){
        state.req = album;
    },

    NOW_PLAYING(state, song){
        state.nowPlaying = song;
    },

    TOGGLE_IS_PLAYING(state, isItActually){
        state.isPlaying = isItActually;
    },
    UPDATE_PLAYLIST(state, list){
        state.playlist = list
    },

    SET_TIMER(state, timeObject){
        state.timer = {max: timeObject.max, current: timeObject.current}
    },

    UPLOADED_ALBUMS_MUTATION(state, uploadedAlbums){
        state.uploadedAlbums = uploadedAlbums
    },

    UPLOADED_COVERS_MUTATIONS(state, covers){
        state.uploadedCovers = covers
    },
}

export default mutations
