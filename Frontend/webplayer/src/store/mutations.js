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
    }

}

export default mutations
