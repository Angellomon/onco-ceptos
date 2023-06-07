<script lang="ts">
  import { episodesStore } from "../../store";
  import Episode from "../seasons-listing/Episode.svelte";

  export let seasonId: string;
  export const itemsPerRow = 3;

  $: episodes = $episodesStore.filter((ep) => ep.seasonId == seasonId);
</script>

<div class="episodes-grid">
  {#each episodes as episode}
    <Episode {episode} />
  {/each}
</div>

<style>
  div.episodes-grid {
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(auto-fill, clamp(200px, 100%, 250px));
    gap: 1em;

    margin-top: 15px;
    padding: 0 1em;
  }
</style>
