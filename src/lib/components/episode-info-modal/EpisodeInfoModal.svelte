<script lang="ts">
  import { fade } from "svelte/transition";
  import { selectedEpisodeInfo } from "../../store";
  import XMark from "../svg/XMark.svelte";

  export const hidden = !!!$selectedEpisodeInfo;

  function handleCloseClick() {
    $selectedEpisodeInfo = null;
  }
</script>

{#if $selectedEpisodeInfo}
  <div class="modal-wrapper" transition:fade={{ duration: 150 }}>
    <div class="info-wrapper">
      <h2>
        {$selectedEpisodeInfo.title}
      </h2>

      <p>{$selectedEpisodeInfo.year} • {$selectedEpisodeInfo.duration}</p>
      <p>{$selectedEpisodeInfo.description}</p>

      <XMark on:click={handleCloseClick} />
    </div>
  </div>
{/if}

<style>
  h2 {
    text-align: left;

    font-size: 30px;
    line-height: 35px;
  }

  p {
    font-size: 18px;
  }

  div.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;

    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    background: transparent;

    backdrop-filter: brightness(0.5);
  }

  div.info-wrapper {
    position: relative;
    height: 60vh;
    width: 50vw;

    padding: 10px 20px;

    background-color: var(--light-background);
    color: var(--secondary-color);
  }
</style>
