<template>
  <div class="albums-list">
    <h1>Albums</h1>
    <Playlist></Playlist>
    <div v-for="cover in covers" :key="cover" @click="reqAlbum(cover)" class="albums-list-element">
      <img class="mini-img" :src="getImage(cover)" alt="mini img">
      <div class="desc">
        <h1>{{ cover.split('/')[0].split('-').pop() }}</h1>
        <h2>Artist: {{ cover.split('/')[0].split('-')[0] }}</h2>
      </div>
    </div>
    <UploadedAlbums></UploadedAlbums>
  </div>
</template>

<script>
import Playlist from "./Playlist";
import UploadedAlbums from "./UploadedAlbums";
import axios from "axios";
import querystring from "querystring";


export default {
name: "AlbumsList",
  components: {
    UploadedAlbums,
    Playlist
  },
  data() {
    return {
      staticEndpoint: 'http://localhost:3000/',
    }
  },
  methods: {
    getImage: function (cover) {
      return this.staticEndpoint + cover;
    },
    reqAlbum: async function (album) {
      let albumName = album.split('/')[0];
      console.log(albumName)
      this.$store.commit("REQ", albumName);
      await this.$store.dispatch("fetchAlbumName");
      // this.$store.dispatch("updateListening",{ updateListening: true, listeningAlbumName: albumName });
      const res = await axios.post('http://localhost:3000/', querystring.stringify({
        updateListening: true,
        listeningAlbumName: albumName
      }));
      console.log(res)
      this.$store.commit('TOGGLE_ALBUM_UPLOAD', false);
    },
  },
  computed: {
    covers() {
      return this.$store.getters.getCoversGetter;
    }
  },
  mounted() {
    this.$store.dispatch("fetchCovers");
  }
}
</script>

<style scoped>
  .albums-list {
    height: 90vh;
    width: 35%;
    /*background-color: #414141;*/
    background-color: rgb(22,23,27);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.56);
    justify-self: flex-start;
    overflow: scroll;
    position: fixed;
    left: 1rem;
    z-index: 99999;
  }
  .albums-list::-webkit-scrollbar {
    display: none;
  }
  .albums-list-element {
    height: 20vh;
    width: 100%;
    color: azure;
    /*border-bottom: 1px azure solid;*/

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: row wrap;
    cursor: pointer;
    /*box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.56);*/
    transition: .5s;
  }
  .albums-list-element:hover { box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.56); }
  .albums-list-element .mini-img {
    height: 100%;
    width: 40%;
    overflow: hidden;
    /*border: 1px solid azure;*/
    transition: .5s;
  }

  .albums-list-element:hover .mini-img {
    transform: scale(1.1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.56);
  }

  .albums-list-element .desc {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    margin-right: 2rem;
    text-align: center;
  }
  .albums-list-element .desc > h1 {
    font-size: 2rem;
    font-weight: 800;
    width: 100%;

    overflow: hidden; /* make sure it hides the content that overflows */
    white-space: nowrap; /* don't break the line */
    text-overflow: ellipsis; /* give the beautiful '...' effect */
  }
  .albums-list-element .desc > h2 {
    font-size: 1.2rem;
    font-weight: 400;
    width: 100%;
  }

  h1 {
    color: azure;
    margin: 1rem;
  }
  @media (max-width: 1024px) {
    .albums-list{
      width: 100%;
      height: 100vh;
      left: 0;
      z-index: 100000;
    }
  }

  @media (min-width: 701px) and (max-width: 1200px) {
    .albums-list-element {
      flex-flow: row nowrap;
    }
    .albums-list-element .desc {
      margin-right: 0;
    }
  }
</style>
