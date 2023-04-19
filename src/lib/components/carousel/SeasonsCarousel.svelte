<script lang="ts">
  import Carousel from "svelte-carousel";
  import type { SeasonType } from "../../../types/series";

  export let season: SeasonType;
</script>

<div class="carousel">
  <h3>{season.title}</h3>
  <button class="quizz">Quizz</button>
</div>

<style>
  div.carousel {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    position: relative;
  }

  button.quizz {
    border-radius: var(--btn-border-radius);

    padding: 10px 20px;
    padding-left: 30px;
  }
</style>
