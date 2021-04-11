<template>
  <div class="uploadedContainer">
    <h1>Uploaded Albums</h1>
    <div v-for="cover in covers" :key="cover" @click="reqAlbum(cover)" class="uploadedListElement" >
      <img class="mini-img" :src="getImage(cover)" alt="mini img">
      <div class="desc">
        <h2> {{ cover.split('/')[0] }} </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadedAlbums",
  data() {
    return {
      staticEndpoint: 'http://localhost:3000/upload/',
    }
  },
  methods: {
    getImage: function (cover) {
      return this.staticEndpoint + cover;
    },
    reqAlbum: function(album) {
      let albumName = album.split('/')[0];
      console.log(albumName)
      this.$store.commit("REQ", albumName);
      // this.$store.dispatch("fetchAlbumName")
      this.$store.dispatch("fetchAlbumNameUploaded")
    },
  },
  computed: {
    covers() {
      return this.$store.getters.getUploadedCovers
    }
  },
  mounted() {
    this.$store.dispatch("fetchCoversUploaded");
  }
}
</script>

<style scoped>
  .uploadedContainer{
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  h1 {
    color: azure;
  }
  .uploadedListElement{
    height: 20vh;
    width: 100%;
    color: azure;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: row wrap;
    cursor: pointer;
    /*box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.56);*/
    transition: .5s;
  }
  .uploadedListElement:hover { box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.56); }
  .uploadedListElement .mini-img {
    height: 100%;
    width: 40%;
    overflow: hidden;
    /*border: 1px solid azure;*/
    transition: .5s;
  }

  .uploadedListElement:hover .mini-img {
    transform: scale(1.1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.56);
  }

  .uploadedListElement .desc {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    margin-right: 2rem;
    text-align: center;
  }
  .uploadedListElement .desc > h1 {
    font-size: 2rem;
    font-weight: 800;
    width: 100%;

    overflow: hidden; /* make sure it hides the content that overflows */
    white-space: nowrap; /* don't break the line */
    text-overflow: ellipsis; /* give the beautiful '...' effect */
  }
  .uploadedListElement .desc > h2 {
    font-size: 1.2rem;
    font-weight: 400;
    width: 100%;
  }

  h1 {
    color: azure;
    margin: 1rem;
  }
  @media (max-width: 1024px) {
    .uploadedListElement{
      width: 100%;
      height: 100vh;
      left: 0;
      z-index: 100000;
    }
  }

  @media (min-width: 701px) and (max-width: 1200px) {
    .uploadedListElement {
      flex-flow: row nowrap;
    }
    .uploadedListElement .desc {
      margin-right: 0;
    }
  }



</style>
