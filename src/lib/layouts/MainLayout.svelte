<script>
  import Header from "../components/Header.svelte";
  import SeriesListing from "../components/listing/SeriesListing.svelte";
  import Showcase from "../components/showcase/Showcase.svelte";
</script>

<main>
  <Header />
  <Showcase />
  <SeriesListing />
</main>

<style>
  main {
    min-width: 100vw;
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
