<script lang="ts">
  import { fade } from "svelte/transition";
  import {
    selectedEpisode,
    episodesStore,
    seasonsStore,
    selectedSeason,
    selectedEpisodeInfo,
    localeOffset,
  } from "../store";
  import {
    getDate,
    getDateFormat,
    isLastEpisiode,
    registerEpisiodeButtonClickByUser,
    saveData,
    searchSeasonByEpisode,
  } from "../utils";
  import ArrowRight from "./svg/ArrowRight.svelte";
  import Plus from "./svg/Plus.svelte";
  import IframePlayer from "./player/IframePlayer.svelte";
  import QuizzButton from "./buttons/QuizzButton.svelte";
  import dayjs from "dayjs";
  import "dayjs/locale/es";
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const defaultSectionStyle = "background: var(--secondary-color);";

  let infoHover = false;
  let nextHover = true;

  function buildSectionStyle(previewUrl: string) {
    return `background: url(${previewUrl}) no-repeat top center fixed;`;
  }

  function buildSectionWithFirstEpisode() {
    const firstEpisode = $episodesStore[0];

    if (!firstEpisode) return defaultSectionStyle;

    return `background: url(${firstEpisode.previewUrl}) no-repeat top center fixed;`;
  }

  function setNextEpisode() {
    let seasonEpisodes = $episodesStore.filter(
      (ep) => ep.seasonId == episode.seasonId
    );

    const i = seasonEpisodes.findIndex((ep) => ep.id == episode.id);

    const nextEpisode = seasonEpisodes[i + 1];

    if (!nextEpisode) {
      const seasonIndex = $seasonsStore.findIndex(
        (se) => se.id == episode.seasonId
      );

      const nextSeason = $seasonsStore[seasonIndex + 1];

      if (!nextSeason) return;

      $selectedSeason = nextSeason;

      seasonEpisodes = $episodesStore.filter(
        (ep) => ep.seasonId == nextSeason.id
      );

      $selectedEpisode = seasonEpisodes[0]; // # first episode of next season
    } else {
      // let releaseDate = getDate(
      //   nextEpisode.releaseDate,
      //   nextEpisode.releaseHour,
      //   nextEpisode.releaseMinute
      // );

      // let isEpisodeReleased = dayjs()
      //   .tz("America/Mexico_City")
      //   .subtract($localeOffset, "hours")
      //   .isAfter(releaseDate);

      // if (!isEpisodeReleased) return;

      $selectedEpisode = nextEpisode;
    }

    saveData();
  }

  function handleNextEpisode() {
    return setNextEpisode;
  }

  async function showInfoClick() {
    $selectedEpisodeInfo = episode;

    await registerEpisiodeButtonClickByUser(episode, "mas_info");
  }

  $: sectionStyle = $selectedEpisode
    ? buildSectionStyle($selectedEpisode.previewUrl)
    : buildSectionWithFirstEpisode();
  $: episode = $selectedEpisode || $episodesStore[0];
  $: releaseDate = episode
    ? getDate(episode.releaseDate, episode.releaseHour, episode.releaseMinute)
    : null;
  $: isEpisodeReleased = dayjs()
    .tz("America/Mexico_City")
    .subtract($localeOffset, "hours")
    .isAfter(releaseDate.tz("America/Mexico_City"));

  $: season = searchSeasonByEpisode(episode);
  $: seasonNumber = season ? season.seasonNumber : 1;
</script>

<section transition:fade style={sectionStyle}>
  <div class="episode-controls">
    <IframePlayer />

    <div class="episode-buttons">
      <button
        on:mouseover={() => {
          infoHover = true;
        }}
        on:mouseleave={() => {
          infoHover = false;
        }}
        on:click={showInfoClick}
        on:focus={() => {}}
        class="info"><Plus hover={infoHover} /> Más información</button
      >

      {#if !isLastEpisiode(episode)}
        <button
          on:mouseover={() => {
            nextHover = true;
          }}
          on:mouseleave={() => {
            nextHover = false;
          }}
          on:focus={() => {}}
          on:click={handleNextEpisode()}
          class="next"
          ><ArrowRight hover={nextHover} /> Siguiente capítulo</button
        >
      {/if}

      {#if $selectedEpisode.quizzUrl}
        <QuizzButton />
      {/if}
    </div>
  </div>

  <div class="episode-info">
    <h2>
      T{seasonNumber}E{episode.episodeNumber}
      "{episode.title}"
    </h2>
    <p>
      {episode.year} • {episode.duration} • Disponible
      {#if !isEpisodeReleased}
        el <b>{getDateFormat(releaseDate)}</b>
      {/if}
    </p>
    <p>{episode.description}</p>
  </div>
</section>

<style>
  section {
    min-height: 500px;
    height: 100%;
    width: 100%;

    position: relative;

    background-image: linear-gradient(
      0deg,
      rgba(12, 35, 64, 1) 0%,
      rgba(255, 255, 255, 0.01) 70%
    );
    background-size: cover;

    display: flex;
    flex-direction: column;
    /* justify-content: space-evenly; */
    align-items: flex-start;

    /* padding-left: 5%; */
  }

  h2 {
    color: white;

    font-size: 45px;

    margin: 0;
  }

  p {
    color: white;

    font-size: 23px;

    margin-top: 0;
  }

  button {
    cursor: pointer;

    background-color: white;
    border-radius: var(--btn-border-radius);
    border: none;

    padding: 10px 20px;
    width: 100%;

    font-size: 22px;

    padding-left: 45px;

    /* border-radius: 20px; */
    position: relative;
  }

  button.info {
    background: rgba(0, 0, 0, 0.2);

    border: 2px solid white;
    color: white;

    backdrop-filter: blur(4px);
  }

  button.next {
    background-color: var(--primary-color);
    color: white;
    border: 2px solid white;
  }

  div.episode-controls {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    flex-direction: row;
    flex-wrap: nowrap;

    min-height: 300px;
    height: 100%;
    width: 100%;

    margin-top: 30px;
    margin-bottom: 30px;
  }

  div.episode-buttons {
    display: flex;

    flex-direction: column;
    justify-content: space-around;

    /* align-content: space-around; */
    gap: 10px;
    align-items: center;
    /* height: 20vh; */

    z-index: 10;
  }

  div.episode-info {
    z-index: 5;

    /* margin-left: 5%; */

    background: rgba(0, 0, 0, 0.2);

    /* filter: blur(5px); */
    backdrop-filter: blur(4px);

    border-top: 2px solid white;

    width: 100%;
    /* padding-left: 5%; */
    padding: 0 1em;
    padding-top: 2%;
  }

  h2,
  p {
    width: 80%;
  }

  @media screen and (max-width: 821px) and (min-width: 500px) {
    button {
      font-size: 19px;
    }
  }

  @media screen and (max-width: 600px) {
    div.episode-controls {
      flex-direction: column;
    }

    div.episode-buttons {
      margin-top: 3ch;
    }
  }
</style>
