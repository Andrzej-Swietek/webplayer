<template>
  <div>
    <input id="songProgress" class="songProgressbar" type="range" @change="setSongTimer" />
       <div><span>{{ formatTimers(this.$store.getters.getTimer.current) }}</span> / <span>{{ formatTimers(this.$store.getters.getTimer.max) }}</span></div>

   </div>
 </template>

 <script>
 export default {
   name: "SongProgress",
   data(){
     return {
       time: 0
     }
   },
   methods:{
     setSongTimer: function (e){
       console.log('SELECTED ON RANGE INPUT', e.target.value, typeof(e.target.value))

       document.getElementById("audio").currentTime = parseInt(e.target.value);
       this.$store.commit("SET_TIMER", { max: document.getElementById("audio").duration, current: parseInt(e.target.value) });

       console.log( 'WHAT U GET',document.getElementById("audio").currentTime," and in Store", this.$store.getters.getTimer.current, this.$store.getters.getTimer.max )
     },
     formatTimers: (time) => {
       return ` ${Math.floor(time/60)}:${ ( time.toString().length<2 )? "0"+ parseInt(time)%60 : parseInt(time)%60 }` ;
     },
   },
   mounted() {
     document.getElementById("audio").ontimeupdate = function(e) {
       // console.log(e.target.currentTime);
       this.$store.commit("SET_TIMER", { max: this.$store.getters.getTimer.max, current: parseInt(e.target.currentTime) });
       this.time = e.target.currentTime
       // console.log(this.time)
       document.getElementById("songProgress").value = e.target.currentTime;
     }.bind(this);
   },
 }
 </script>

 <style scoped>
   .songProgressbar{
     width: 100%;
   }
   input[type=range] {
     box-sizing: border-box;
     font-size: 16px;
     line-height: 1;
     height: 2em;
     background-color: transparent;
     cursor: pointer;
     -webkit-appearance: none;
     width: 100%;
   }
   input[type=range]::-webkit-slider-thumb {
     -webkit-appearance: none;
   }
   input[type=range]:focus {
     outline: none;
   }
   input[type=range]::-ms-track {
     width: 100%;
     cursor: pointer;
     background: transparent;
     border-color: transparent;
     color: transparent;
   }
   input[type=range]::-webkit-slider-thumb {
     -webkit-appearance: none;
     width: 2em;
     height: 2em;
     margin-top: 0;
     background-color: #414141;
     border-radius: 1em;
     border: 2px solid rgba(0, 0, 0, 0.2);
     cursor: pointer;
   }
   input[type=range]::-moz-range-thumb {
     width: 2em;
     height: 2em;
     margin-top: 0;
     background-color: #414141;
     border-radius: 1em;
     border: 2px solid rgba(0, 0, 0, 0.2);
     cursor: pointer;
   }
   input[type=range]::-ms-thumb {
     width: 2em;
     height: 2em;
     margin-top: 0;
     background-color: #16a085;
     border-radius: 1em;
     border: 2px solid rgba(0, 0, 0, 0.2);
     cursor: pointer;
   }
   input[type=range]:hover::-webkit-slider-thumb {
     border-color: rgba(0, 0, 0, 0.3);
   }
   input[type=range]:hover::-moz-range-thumb {
     border-color: rgba(0, 0, 0, 0.3);
   }
   input[type=range]:hover::-ms-thumb {
     border-color: rgba(0, 0, 0, 0.3);
   }
   input[type=range]:active::-webkit-slider-thumb {
     border-color: rgba(0, 0, 0, 0.5);
   }
   input[type=range]:active::-moz-range-thumb {
     border-color: rgba(0, 0, 0, 0.5);
   }
   input[type=range]:active::-ms-thumb {
     border-color: rgba(0, 0, 0, 0.5);
   }
   input[type=range]::-webkit-slider-runnable-track {
     width: 100%;
     cursor: pointer;
     height: 1em;
     border-bottom: 2px solid rgba(0, 0, 0, 0.2);
     background-color: transparent;
   }
   input[type=range]::-moz-range-track {
     width: 100%;
     cursor: pointer;
     height: 1em;
     border-bottom: 2px solid rgba(0, 0, 0, 0.2);
     background-color: transparent;
   }
   input[type=range]::-ms-track {
     background: transparent;
     border-color: transparent;
     color: transparent;
   }


 </style>
