<script lang="ts">
  import arrowRightSVGSource from "../../../assets/boton-avance_derecha.svg";
  import arrowLeftSVGSource from "../../../assets/boton-avance_izquierda.svg";
  import Carousel from "svelte-carousel";
  import type { EpisodeType } from "../../../types/series";
  import Episode from "./Episode.svelte";

  export let episodes: EpisodeType[];

  // let showPrevPage;
  // let showNextPage;

  $: eps = episodes;
</script>

<div class="episodes-box">
  <div class="hero">
    <Carousel
      particlesToShow={2}
      particlesToScroll={1}
      let:showPrevPage
      let:showNextPage
      let:loaded
    >
      <img
        class="carousel-control"
        src={arrowRightSVGSource}
        alt=">"
        slot="prev"
        on:click={showNextPage}
        on:keypress={() => {}}
      />
      {JSON.stringify(loaded)}
      {#each eps as episode, imageIndex (episode.id)}
        {#if loaded.includes(imageIndex)}
          <Episode {episode} />
        {:else}
          hmmm
        {/if}
      {/each}

      <img
        class="carousel-control"
        src={arrowLeftSVGSource}
        alt="<"
        slot="next"
        on:click={showPrevPage}
        on:keypress={() => {}}
      />
    </Carousel>
  </div>
</div>

<style>
  img.carousel-control {
    width: 50px;

    cursor: pointer;
  }
</style>
