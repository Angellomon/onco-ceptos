<script lang="ts">
  import dayjs from "dayjs";
  import "dayjs/locale/es";
  import type { EpisodeType } from "../../types/series";
  import { getDate, getDateFormat, searchSeasonByEpisode } from "../utils";
  import { localeOffset } from "../store";

  export let episode: EpisodeType;

  export let white = false;

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

<div>
  <h2 class:white-h2={white}>
    T{seasonNumber}E{episode.episodeNumber}
    "{episode.title}"
  </h2>

  <p class:white-p={white}>
    {releaseDate.year()}
    {#if !episode.pendingRelease}
      • {episode.duration}
      • Disponible
    {/if}
    {#if !isEpisodeReleased}
      el <b>{getDateFormat(releaseDate)}</b>
    {/if}
  </p>
  <p class:white-p={white}>{episode.description}</p>
</div>

<style>
  div {
    overflow-y: scroll;
  }

  h2 {
    text-align: left;

    font-size: 30px;
    line-height: 35px;
  }

  p {
    font-size: 18px;
  }

  .white-h2 {
    color: white;

    font-size: 45px;

    margin: 0;
    line-height: 35px;
    line-height: unset;
  }

  .white-p {
    color: white;

    font-size: 23px;

    margin-top: 0;

    width: 80%;
  }

  @media screen and (max-width: 821px) and (min-width: 500px) {
    div {
      margin: 5ch;
    }
  }

  @media screen and (max-width: 500px) {
    div {
      margin: 5ch;
    }
  }
</style>
