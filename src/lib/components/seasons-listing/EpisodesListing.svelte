<script lang="ts">
  import arrowRightSVGSource from "../../../assets/boton-avance_derecha.svg";
  import arrowLeftSVGSource from "../../../assets/boton-avance_izquierda.svg";
  import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";

  import type { EpisodeType } from "../../../types/series";
  import Episode from "./Episode.svelte";

  export let episodes: EpisodeType[];

  // let showPrevPage;
  // let showNextPage;

  $: eps = episodes;
</script>

<Splide
  options={{
    type: "loop",
    perPage: 4,
    perMove: 1,
  }}
  hasTrack={false}
>
  <SplideTrack class="track">
    {#each episodes as episode (episode.id)}
      <SplideSlide>
        <Episode {episode} />
      </SplideSlide>
    {/each}
  </SplideTrack>

  <div class="splide__arrows">
    <button class="splide__arrow splide__arrow--prev">
      <img class="rigtArrow" src={arrowRightSVGSource} alt=">" />
    </button>
    <button class="splide__arrow splide__arrow--next">
      <img class="rigtArrow" src={arrowLeftSVGSource} alt="<" />
    </button>
  </div>
</Splide>

<style>
  .splide__arrows button {
    height: 100%;
    background: none;
  }

  img.rigtArrow {
    cursor: pointer;

    height: 69%;

    z-index: 10;
  }
</style>
