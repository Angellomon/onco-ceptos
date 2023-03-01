<script>
  import { slide } from "svelte/transition";
  import Header from "../components/Header.svelte";
  import SeriesListingSidebar from "../components/listing/SeriesListingSidebar.svelte";
  import SeriesDescription from "../components/SeriesDescription.svelte";
  import Showcase from "../components/showcase/Showcase.svelte";

  import { selectedEpisode } from "../store";
  import EpisodeLayout from "./EpisodeLayout.svelte";
</script>

<Header />
<Showcase />
<section class="series-listing" transition:slide={{ delay: 100 }}>
  <h1>SERIES</h1>
  <div class="titulo-series" />
  <div class="content">
    <SeriesListingSidebar />
    <SeriesDescription />
  </div>
</section>
{#if $selectedEpisode}
  <EpisodeLayout />
{/if}

<style>
  h1 {
    color: var(--light-background);
    margin: 0 4%;
    background-color: var(--sidebar-color);
  }
  section.series-listing {
    background-color: var(--sidebar-color);

    padding: 2% 1%;
    margin: 0;

    /* min-height: 70vh; */

    position: relative;
  }

  div.content {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-around;

    width: 100%;
    height: 100%;
    padding: 2% 1%;
  }
</style>
