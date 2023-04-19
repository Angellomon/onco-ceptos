<script lang="ts">
  import { episodesStore } from "../../store";
  import type { SeasonType } from "../../../types/series";
  import EpisodesListing from "./EpisodesListing.svelte";
  import Interrogation from "../svg/Interrogation.svelte";

  export let season: SeasonType;

  let seasonBoxStyle = `background: url(/preview-img/${season.previewUrl})`;

  let hover = false;

  function handleMouseOver() {
    return () => {
      hover = true;
    };
  }

  function handleMouseLeave() {
    return () => {
      hover = false;
    };
  }
  $: episodes = $episodesStore.filter((e) => e.seasonId == season.id);
</script>

<div class="season-box" style={seasonBoxStyle}>
  <h3>{season.title}</h3>
  <button
    on:mouseover={handleMouseOver()}
    on:mouseleave={handleMouseLeave()}
    on:focus={() => {}}
    class="quizz"
  >
    <Interrogation {hover} /> Quizz</button
  >
</div>
<EpisodesListing {episodes} />

<style>
  div.season-box {
    background-repeat: no-repeat;
    background-size: cover;

    position: relative;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 100px;
    width: 80%;

    justify-self: center;
    align-self: center;
  }

  h3 {
    color: white;

    font-size: 35px;
  }

  button.quizz {
    border: 2px solid white;
    border-radius: var(--btn-border-radius);

    padding: 5px 20px;
    padding-left: 40px;

    height: 50px;

    position: relative;

    background: var(--secondary-color);
    color: white;

    font-size: 18px;

    cursor: pointer;
  }

  /* button.info {
    background: transparent;

    color: var(--secondary-color);
  } */
</style>
