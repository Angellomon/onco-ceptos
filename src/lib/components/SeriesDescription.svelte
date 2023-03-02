<script lang="ts">
  import { fly } from "svelte/transition";
  import { selectedSeries, seriesStore } from "../store";
  import EpisodesListing from "./listing/EpisodesListing.svelte";
</script>

<div
  class="series-description"
  transition:fly={{
    opacity: 1,
    x: 500,
    duration: 500,
  }}
>
  <h2 id="series-title">{$selectedSeries?.title}</h2>

  <p>{$selectedSeries?.description}</p>

  <EpisodesListing />
</div>

<style>
  h2 {
    text-align: right;
    font-size: 40px;
  }

  p {
    text-align: right;
    font-size: 22px;
  }

  div.series-description {
    width: 100%;

    background-color: #c2e5df;
    margin-top: -4vh;
    margin-right: 5vw;
    margin-left: 3vw;
    padding-right: 3vw;

    position: relative;

    -webkit-box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  }
</style>
