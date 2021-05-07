<template>
  <div class="PlayList">
    <div class="open" @click="openPlayList">
      <h1><i class="fa fa-music"></i></h1>
      <h1> MY PLAYLIST </h1>
      <h1><i class="fa fa-music"></i></h1>
    </div>

    <transition name="slide-fade">
    <div v-if="show" class="container">
      <div class="element" v-for="song in this.$store.getters.getPlaylist" :key="song.name" @click="changeNowPlaying(getTitle(song),song)" >
        <h3>{{ song.album }}</h3>
        <h3>{{ song.name }}</h3>
        <h3>{{ song.size }}</h3>
      </div>
    </div>
    </transition>

  </div>
</template>

<script>

export default {
  name: "Playlist",
  methods:{
    getTitle: (song)=> song.name.split('-')[1],
    openPlayList: function (){
      console.log(this.$store.getters.getPlaylist)
      document.querySelector('.PlayList').classList.toggle('h-auto')
      this.show = (!this.show)
    },
    getDuration: async function() {
      return new Promise(function(resolve) {
        let audio = document.getElementById("audio")
        audio.addEventListener("loadedmetadata", function(){
          resolve(audio.duration);
        });
      });
    },
    changeNowPlaying: async function (song, full) {

      // console.log(full, song)
      // let path_to_mp3 = full.album +"/"+ full.name;
      // let mp3_src = "http://localhost:3000/"+path_to_mp3
      // document.getElementById("audio").pause(); // pauzuj granie
      // document.getElementById("audio_src").src = mp3_src;
      // document.getElementById("audio").load(); // UWAGA - dopiero w tym momencie powinna być możliwość wylogowania GET-a danego pliku mp3 na serwerze
      // document.getElementById("audio").play(); // pauzuj granie
      // this.$store.commit("NOW_PLAYING", song);
      // this.$store.commit('TOGGLE_IS_PLAYING', true)
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
  },
  data(){
    return {
      show: false
    }
  },
  computed: {
      playlist: function (){
        console.log(this.$store.getters.getPlaylist)
        return this.$store.getters.getPlaylist;
      }
    }
}
</script>

<style scoped>
.PlayList {
  order: 1;
  width: 100%;
  height: 10vh;
  /*background-color: #42b983;*/
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  color: azure;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.56);
  transition: .5s;
  margin: 0 0 1rem 0;
}
h1 {
  margin: 0 1rem;
}




.h-auto {
  height: auto;
  flex-flow: column;
}

.element {
  width: 100%;
  height: 5vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .5s;
  padding: 3.5rem 1rem;
}
.element:hover{
  color: #42b983;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.56);
}
.open {
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row;
  transition: .5s;
}
.open:hover {
  color: #42b983;
}
.container {
  margin-bottom: 1rem;
  width: 100%;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  /*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
  transition: none;
}
.slide-fade-enter
  /*.slide-fade-leave-to*/
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
@media (min-width: 701px) and (max-width: 1200px){
  h1  {
    font-size: 1.2rem;
  }
  h3 {
    font-size: 1rem;
  }
}
h3 {
  margin: 0 1rem;
 }
</style>
