<script lang="ts">
  import type { SeasonType } from "../../../types/series";

  export let season: SeasonType;

  let seasonBoxStyle = `background: url(/preview-img/${season.previewUrl})`;

  let hover = false;
</script>

<div class="season-box" style={seasonBoxStyle}>
  {#if hover}
    <div class="episode-options" class:hover />
  {/if}
</div>

<style>
  div.season-box {
    background-repeat: no-repeat;
    background-size: cover;

    position: relative;
  }

  div.episode-options {
    position: absolute;

    bottom: 0;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: 100%;
  }
</style>
