<script lang="ts">
  import type { EpisodeType } from "../../../types/series";

  export let episode: EpisodeType;
</script>

<div id={episode.id} class="episode-box">
  {episode.title}
</div>

<style>
  div.episode-box {
  }
</style>
