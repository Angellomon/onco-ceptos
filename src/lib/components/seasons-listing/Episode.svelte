<script lang="ts">
  import type { EpisodeType } from "../../../types/series";

  export let episode: EpisodeType;
</script>

<div id={episode.id} class="episode-box">
  {episode.title}
</div>

<style>
  div.episode-box {
    height: 100%;
    width: 100%;

    min-height: 20vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;

    background-color: white;
  }
</style>
