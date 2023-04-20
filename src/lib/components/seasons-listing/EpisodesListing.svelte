<script lang="ts">
  import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";

  import type { EpisodeType } from "../../../types/series";
  import Episode from "./Episode.svelte";
  import NextButton from "../svg/NextButton.svelte";
  import PrevButton from "../svg/PrevButton.svelte";

  export let episodes: EpisodeType[];
</script>

<Splide
  options={{
    type: "loop",
    perPage: 3,
    perMove: 1,
    gap: "50px",
    height: "100%",
    width: "100%",
    padding: "50px",
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
      <NextButton />
    </button>
    <button class="splide__arrow splide__arrow--next">
      <PrevButton />
    </button>
  </div>
</Splide>

<style>
  .splide__arrows button {
    height: 100%;
    background: none;
    opacity: 1;
  }

  img.rigtArrow {
    cursor: pointer;

    height: 50%;

    z-index: 10;
  }
</style>
