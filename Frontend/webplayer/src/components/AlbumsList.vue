<template>
  <div class="albums-list">
    <h1>Albums</h1>

    <div v-for="index in 10" :key="index" class="albums-list-element">
      <img class="mini-img" src="https://images.macrumors.com/t/RsRxUqFqB0mh-vSOEnl0I22oIhg=/1200x1200/smart/article-new/2020/12/apple-music-logo.jpg" alt="mini img">
      <div class="desc">
        <h1>Album: {{ index }}</h1>
        <h2>Zespół: XXX</h2>
      </div>
    </div>


  </div>
</template>

<script>
export default {
name: "AlbumsList"
}
</script>

<style scoped>
  .albums-list {
    height: 90vh;
    width: 30%;
    /*background-color: #414141;*/
    background-color: rgb(22,23,27);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.56);
    justify-self: flex-start;
    overflow: scroll;
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
</style>
