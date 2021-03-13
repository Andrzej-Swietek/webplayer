<template>
  <div id="app">
    <Navbar></Navbar>
    <AlbumsList></AlbumsList>
    <CurrentSong></CurrentSong>
    <SongsList></SongsList>
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
    SongsList
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
</style>
