<template>
  <div class="songs-list">
    <h1>Songs</h1>

    <div class="songs-list-element no-hover">
      <div class="playListIcon"> <i class="fas fa-music"></i> </div>
      <div class="desc">
        <h1> Album </h1>
        <h2 class="band"> Band </h2>
        <h2 class="title"> Title </h2>
        <h2 class="file-weight"> Size </h2>
      </div>
    </div>

    <div v-for="song in songList" :key="song.name" class="songs-list-element" >
      <div class="addToPlayList" @click="addToPlayList(song)"> <i class="far fa-heart"></i> </div>
      <div class="desc" @click="changeNowPlaying(getTitle(song),song)">
        <h1>{{ getAlbum(song) }}</h1>
        <h2 class="band">{{getBand(song)}}</h2>
        <h2 class="title">{{getTitle(song)}}</h2>
        <h2 class="file-weight">{{song.size}}</h2>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "SongsList",
  computed: {
    songList() {
      return this.$store.getters.getCurrentAlbumGetter;
    }
  },
  methods: {
    getTitle: (song)=> song.name.split('-')[1],
    getBand: (song)=> song.name.split('-')[2].split('.')[0] ,
    getAlbum: (song) => song.name.split('-')[0],
    getDuration: async function() {
      return new Promise(function(resolve) {
        let audio = document.getElementById("audio")
        audio.addEventListener("loadedmetadata", function(){
          resolve(audio.duration);
        });
      });
    },
    changeNowPlaying: async function (song, full) {

      console.log(full)
      let path_to_mp3 = full.album + "/" + full.name;
      let mp3_src = "http://localhost:3000/" + path_to_mp3
      document.getElementById("audio").pause(); // pauzuj granie
      document.getElementById("audio_src").src = mp3_src;
      document.getElementById("audio").load(); // UWAGA - dopiero w tym momencie powinna być możliwość wylogowania GET-a danego pliku mp3 na serwerze



      document.getElementById("audio").play();

      document.getElementById('songProgress').min = 0;
      document.getElementById('songProgress').value = 0;
      document.getElementById('songProgress').step = 1;

      this.$store.commit("NOW_PLAYING", song);
      this.$store.commit('TOGGLE_IS_PLAYING', true)

      let duration = await this.getDuration()
      this.$store.commit("SET_TIMER", {max: duration, current: 0});
      document.getElementById('songProgress').max = Math.floor(duration).toString();
      console.log(duration)

    },
    addToPlayList: function (song){
      console.log(song.album)
      console.log(song.name)
      console.log(song.size)
      let payload = {'album': song.album, 'name': song.name, 'size': song.size}
      this.$store.dispatch('addToPlayList',payload)
    }
  }
}
</script>

<style scoped>
.active {
  border: 3px solid #00ea02;;
  color: #00ea02;
}
h1 {
  color: azure;
  /*margin: 1rem 0;*/
}
.songs-list {
  padding-top: 1rem;
  height: 90vh;
  width: 35%;
  background-color: rgb(22,23,27);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.56);
  justify-self: flex-end;
  overflow-y: scroll;

  position: fixed;
  right: 1rem;
  z-index: 99999;
  border-radius: 15px;
}
.songs-list-element {
  height: 10vh;
  width: 100%;
  color: azure;
  /*border-bottom: 1px azure solid;*/

  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
  cursor: pointer;
  /*box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.56);*/
  transition: .5s;
}
.songs-list-element:hover { box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.56); }

.songs-list-element:hover .mini-img {
  transform: scale(1.1);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.56);
}

.songs-list-element .desc {
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row;
  /*margin-right: 2rem;*/
  text-align: center;
}
.songs-list-element .desc > h1 {
  font-size: 1.2rem;
  font-weight: 900;
  min-width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row;
  /*margin-left: 1rem;*/
  text-align: center;
}
.songs-list-element .desc > h2 {
  font-size: 1.2rem;
  font-weight: 400;
  min-width: 20%;
  margin: 1rem;
  text-align: center;
}
.songs-list-element .desc > .file-weight { justify-self: flex-end; }
.songs-list-element .desc > .title { width: auto; }
.songs-list-element .desc > .band {
  margin: 0;
}
.no-hover:hover {
  box-shadow: none;
}
.title {
  overflow: hidden; /* make sure it hides the content that overflows */
  white-space: nowrap; /* don't break the line */
  text-overflow: ellipsis; /* give the beautiful '...' effect */
}
.flex-between {
  justify-content: space-between;
  padding: 0 2rem;
}
@media (max-width: 700px) {
  .songs-list{
    width: 100%;
    height: 100vh;
    left: 0;
    z-index: 99999;
  }
}
@media (min-width: 701px) and (max-width: 1200px) {
  .songs-list {
    font-size: 1rem;
  }
  .songs-list > * {
    font-size: 1rem;
  }
  .songs-list > h1 {
    font-size: 2rem;
  }
  .songs-list .playListIcon{
    font-size: 1.5rem;
  }
}
.playListIcon,
.addToPlayList {
  color: white;
  font-size: 2rem;
  transition: .5s;
}
.addToPlayList:hover {
  color: #dd2450;
}
</style>
