<script lang="ts">
  import dayjs from "dayjs";
  import "dayjs/locale/es";
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";

  import { fade } from "svelte/transition";
  import { selectedEpisodeInfo } from "../../store";
  import XMark from "../svg/XMark.svelte";
  import EpisodeInfo from "../EpisodeInfo.svelte";
  import { getDate } from "../../utils";

  export const hidden = !!!$selectedEpisodeInfo;

  dayjs.extend(utc);
  dayjs.extend(timezone);

  function handleCloseClick() {
    $selectedEpisodeInfo = null;
  }
</script>

{#if $selectedEpisodeInfo}
  <div class="modal-wrapper" transition:fade={{ duration: 150 }}>
    <div class="info-wrapper">
      <EpisodeInfo episode={$selectedEpisodeInfo} />

      <XMark on:click={handleCloseClick} />
    </div>
  </div>
{/if}

<style>
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
    overflow-y: scroll;

    background: transparent;

    backdrop-filter: brightness(0.5);
  }

  div.info-wrapper {
    position: relative;
    height: auto;
    width: 90%;

    padding: 10px 20px;

    background-color: var(--light-background);
    color: var(--secondary-color);
  }

  @media screen and (max-width: 821px) and (min-width: 500px) {
    div.info-wrapper {
      padding: 0;
    }
  }

  @media screen and (max-width: 500px) {
    div.info-wrapper {
      padding: 0;

      margin-top: 15ch;
    }
  }
</style>
