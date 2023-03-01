<script lang="ts">
  import { selectedEpisode } from "../store";
</script>

<div class="episode-description">
  {#if $selectedEpisode}
    <h2>{$selectedEpisode.title}</h2>
  {:else}
    <h3>No encontrado :(</h3>
  {/if}
</div>

<style>
  div.episode-description {
    background-color: var(--primary-color);
    filter: brightness(50%);
    width: 100%;
  }
</style>
