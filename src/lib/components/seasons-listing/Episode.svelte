<script lang="ts">
  import { fade } from "svelte/transition";
  import { writable } from "svelte/store";
  import type { EpisodeType } from "../../../types/series";
  import {
    selectedEpisode,
    seasonsStore,
    selectedSeason,
    selectedEpisodeInfo,
  } from "../../store";
  import { saveData } from "../../utils";
  import PlayButton from "../svg/PlayButton.svelte";
  import InfoButton from "./InfoButton.svelte";
  import { onDestroy, onMount } from "svelte";
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";

  dayjs.extend(utc);
  dayjs.extend(timezone);

  export let episode: EpisodeType;

  let episodeHover = false;
  let infoHover = false;
  let favHover = false;

  function showEpisodeInfo() {
    $selectedEpisodeInfo = episode;
  }

  function addEpisodeToFavorites() {}

  function setCurrentEpisode() {
    $selectedEpisode = episode;
    const season = $seasonsStore.find((se) => se.id == episode.seasonId);

    if (!season) return;

    $selectedSeason = season;

    goTop();
    saveData();
  }

  function goTop() {
    document.body.scrollIntoView({
      behavior: "smooth",
    });
  }

  function handleEpisodeClick() {
    if (infoHover) return showEpisodeInfo();
    if (favHover) return addEpisodeToFavorites();
    if ($pendingRelease) return;

    return setCurrentEpisode();
  }

  function handleKeyDown(e) {}

  function handleMouseOver() {
    episodeHover = true;
  }

  function handleMouseLeave() {
    episodeHover = false;
  }

  let episodeReleaseInterval: any;
  let isEpisodeReleased: boolean;

  onMount(() => {
    episodeReleaseInterval = setInterval(() => {
      isEpisodeReleased = dayjs()
        .tz("America/Mexico_City")
        .subtract(1, "hour")
        .isAfter(releaseDate);

      $pendingRelease = !isEpisodeReleased;
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(episodeReleaseInterval);
  });

  const pendingRelease = writable(true);

  $: releaseDate = episode
    ? dayjs(
        `${episode.releaseDate} ${episode.releaseHour}:${episode.releaseMinute}`,
        "d/MMM/Y h:m",
        "America/Mexico_City"
      )
    : null;

  $: style = `background: no-repeat center/100% url('${episode.portraitUrl}'); background-size: cover;`;

  // TODO: fix season number dislplay (always displays 1)
</script>

<div
  class="episode-box"
  class:pending-release={$pendingRelease}
  {style}
  on:click={handleEpisodeClick}
  on:focus={() => {}}
  on:keypress={handleKeyDown}
  on:mouseover={handleMouseOver}
  on:mouseleave={handleMouseLeave}
>
  <InfoButton bind:hover={infoHover} />

  <div in:fade={{ duration: 100 }} class="title-wrapper">
    {#if !$pendingRelease}
      <PlayButton bind:hover={episodeHover} />
    {/if}
    <h3>
      T1E{episode.episodeNumber}
      "{episode.title}"
    </h3>
  </div>
</div>

<style>
  h3 {
    color: white;
    height: 100%;
    width: 90%;

    font-size: 25px;
    line-height: 30px;

    text-shadow: 1px 0px 30px rgba(1, 1, 1, 0.5);

    position: absolute;
    right: 0;
    left: 0;
    top: 10%;
    bottom: 0;
    margin: auto;
  }

  div.title-wrapper {
    width: 100%;
    min-width: 30vw;

    height: 250px;
    backdrop-filter: brightness(0.8);

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
  }

  div.episode-box {
    /* min-height: 20vh; */
    width: 100%;

    min-width: 30vw;

    background-size: cover;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    cursor: pointer;
  }

  div.pending-release {
    background-color: var(--primary-color);
    cursor: default;
  }

  @media screen and (max-width: 821px) {
    div.episode-box {
      width: 45vw;
    }
  }

  @media screen and (max-width: 500px) {
    div.episode-box {
      width: 90vw;
    }
  }
</style>
