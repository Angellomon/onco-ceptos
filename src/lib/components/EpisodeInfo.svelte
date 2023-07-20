<script lang="ts">
  import dayjs from "dayjs";
  import "dayjs/locale/es";
  import type { EpisodeType } from "../../types/series";
  import { getDate, getDateFormat, searchSeasonByEpisode } from "../utils";
  import { localeOffset } from "../store";

  export let episode: EpisodeType;

  $: releaseDate = episode
    ? getDate(episode.releaseDate, episode.releaseHour, episode.releaseMinute)
    : null;
  $: isEpisodeReleased = dayjs()
    .tz("America/Mexico_City")
    .subtract($localeOffset, "hours")
    .isAfter(releaseDate.tz("America/Mexico_City"));
  // $: pendingRelease = !isEpisodeReleased;

  // TODO: fix season number dislplay (always displays 1)

  $: season = searchSeasonByEpisode(episode);
  $: seasonNumber = season ? season.seasonNumber : 1;
</script>

<div>
  <h2>
    T{seasonNumber}E{episode.episodeNumber}
    "{episode.title}"
  </h2>

  <p>
    {episode.year} • {episode.duration}
    • Disponible
    {#if !isEpisodeReleased}
      el <b>{getDateFormat(releaseDate)}</b>
    {/if}
  </p>
  <p>{episode.description}</p>
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
