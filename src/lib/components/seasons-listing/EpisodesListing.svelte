<script lang="ts">
  import arrowRightSVGSource from "../../../assets/boton-avance_derecha.svg";
  import arrowLeftSVGSource from "../../../assets/boton-avance_izquierda.svg";
  import Carousel from "svelte-carousel";
  import type { EpisodeType } from "../../../types/series";

  export let episodes: EpisodeType[];

  let showPrevPage;
  let showNextPage;
</script>

<div class="episodes-box">
  <Carousel particlesToShow={3} let:showPrevPage let:showNextPage>
    <img
      class="carousel-control"
      src={arrowRightSVGSource}
      alt=">"
      slot="prev"
      on:click={showNextPage}
      on:keypress={() => {}}
    />
    <!-- {#each episodes as episode}
      <div class="episode-box" />
    {/each} -->

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

<style>
  img.carousel-control {
    width: 50px;

    cursor: pointer;
  }
</style>
