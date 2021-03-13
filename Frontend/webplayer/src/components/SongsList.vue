<template>
  <div class="songs-list">
    <h1>Songs</h1>

    <div class="songs-list-element no-hover flex-between">

        <h2>Album</h2>
        <h2 class="band">Band</h2>
        <h2 class="title">Title</h2>
        <h2 class="file-weight">Size</h2>

    </div>
    <div v-for="index in 10" :key="index" class="songs-list-element">
       <div class="desc">
        <h1>Album {{ index }}</h1>
        <h2 class="band">Zespół</h2>
        <h2 class="title">Leaves From Vine</h2>
         <h2 class="file-weight">10MB</h2>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "SongsList"
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
  width: 100%;
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
  width: 40%;
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
  width: 20%;
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

</style>
