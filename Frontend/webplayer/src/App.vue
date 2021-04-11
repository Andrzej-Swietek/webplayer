<template>
  <div id="app">
    <Navbar></Navbar>
    <div @click="hamburgerClick" class="hamburger"><h1><i class="fa fa-bars"></i></h1></div>
    <transition name="fade">
      <AlbumsList v-if="albumsExtended"></AlbumsList>
    </transition>
    <div @click="songListToggle" class="songListHamburger"><h1><i class="fa fa-music"></i></h1></div>
    <CurrentSong></CurrentSong>

    <transition name="slide-fade">
      <SongsList v-if="songsExtended"></SongsList>
    </transition>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import AlbumsList from "./components/AlbumsList";
import CurrentSong from "./components/CurrentSong";
import SongsList from "./components/SongsList";
export default {
  name: 'App',
  components: {
    Navbar,
    AlbumsList,
    CurrentSong,
    SongsList,
  },
  data(){
    return{
      albumsExtended: true,
      songsExtended: true
    }
  },
  methods: {
    hamburgerClick: function () {
      this.albumsExtended = !this.albumsExtended;
    },
    songListToggle: function () {
      this.songsExtended = !this.songsExtended;
    }
  },
  mounted() {
    this.$store.dispatch("fetchFirst");
    this.$store.dispatch("getPlaylist");
    this.$store.dispatch("fetchCoversUploaded");
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column wrap;

    width: 100%;
    height: 100vh;
    /*overflow: hidden;*/
  }
  #app {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-flow: row wrap;

    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .hamburger,
  .songListHamburger {
    display: none;
  }
  @media (max-width: 1024px) {
    .hamburger {
      display: flex;
      justify-content: flex-start;
      position: absolute;

      width: auto;
      top: 1rem;
      left: 3rem;
      color: white;
      z-index: 900000;
      cursor: pointer;
      margin: 0;
    }
    .songListHamburger {
      display: flex;
      justify-content: flex-end;
      position: absolute;

      width: auto;
      top: 1rem;
      right: 3rem;
      color: white;
      z-index: 900000;
      cursor: pointer;
      margin: 0;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }

</style>
