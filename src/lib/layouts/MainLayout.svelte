<script lang="ts">
  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";
  import EpisodeInfoModal from "../components/episode-info-modal/EpisodeInfoModal.svelte";
  import SeasonsListing from "../components/seasons-listing/SeasonsListing.svelte";
  import SelectedEpisode from "../components/SelectedEpisode.svelte";
  import Title from "../components/Title.svelte";
  import { dataIsLoading } from "../store";
  import Loading from "./Loading.svelte";

  let hidden = true;
</script>

{#if $dataIsLoading}
  <Loading />
{:else}
  <main>
    <Header />
    <SelectedEpisode />
    <SeasonsListing />
    <Title />
    <Footer />
    <EpisodeInfoModal bind:hidden />
  </main>
{/if}

<style>
  main {
    position: relative;
  }

  /* .scroll-lock {
    overflow: hidden;
    margin: 0;
    height: 100%;
  } */
</style>
