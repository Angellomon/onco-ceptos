<script lang="ts">
  import type { SeasonType } from "../../../types/series";
  import EpisodesGrid from "../episodes-grid/EpisodesGrid.svelte";

  export let season: SeasonType;
</script>

<aside id={season.id}>
  <div class="season-box">
    <h3>{season.title}</h3>
  </div>
  <div class="episodes">
    <!-- <EpisodesListing {episodes} /> -->
    <EpisodesGrid seasonId={season.id} />
  </div>
</aside>

<style>
  aside {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    height: 100%;
    width: 100%;

    min-height: 25vh;

    justify-self: center;
    align-self: center;

    margin: 0;

    margin-bottom: 15px;
  }

  div.episodes {
    width: 100%;
    margin: 0;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  div.season-box {
    background-repeat: no-repeat;
    background-size: cover;

    position: relative;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 100%;
    width: 80%;

    justify-self: center;
    align-self: center;
  }

  h3 {
    color: white;

    font-size: 35px;
  }

  /* button.info {
    background: transparent;

    color: var(--secondary-color);
  } */
</style>
