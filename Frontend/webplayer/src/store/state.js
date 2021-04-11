const state = {
    albums: [],
    covers: [],
    currentAlbum: [],
    req:'',
    nowPlaying: '',
    isPlaying: false,
    playlist: [],
    timer: {max: 0, current:0},

    shouldUploadedBeShown: false,
    uploadedAlbums: [],
    uploadedCovers: [],
}

export default state
