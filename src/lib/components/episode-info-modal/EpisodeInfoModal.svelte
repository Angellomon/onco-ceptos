<script lang="ts">
  import dayjs from "dayjs";
  import "dayjs/locale/es";
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";

  import { fade } from "svelte/transition";
  import { selectedEpisodeInfo } from "../../store";
  import XMark from "../svg/XMark.svelte";
  import EpisodeInfo from "../EpisodeInfo.svelte";

  export const hidden = !!!$selectedEpisodeInfo;

  dayjs.extend(utc);
  dayjs.extend(timezone);

  function handleCloseClick() {
    $selectedEpisodeInfo = null;
  }

  $: releaseDate = $selectedEpisodeInfo
    ? dayjs(
        `${$selectedEpisodeInfo.releaseDate} ${$selectedEpisodeInfo.releaseHour}:${$selectedEpisodeInfo.releaseMinute}`,
        "d/MMM/Y h:m",
        "America/Mexico_City"
      )
    : null;

  $: isEpisodeReleased = dayjs()
    .tz("America/Mexico_City")
    .subtract(10, "minutes")
    .isAfter(releaseDate);

  // $: {
  //   console.log(releaseDate);
  //   console.log(
  //     $selectedEpisodeInfo?.releaseHour,
  //     $selectedEpisodeInfo?.releaseMinute
  //   );
  //   console.log(
  //     dayjs().tz("America/Mexico_City").subtract(16, "minutes"),
  //     isEpisodeReleased
  //   );
  // }
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
