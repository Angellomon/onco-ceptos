<script lang="ts">
  import dayjs from "dayjs";
  import "dayjs/locale/es";
  import type { EpisodeType } from "../../types/series";
  import { getDate } from "../utils";

  export let episode: EpisodeType;

  $: releaseDate = episode
    ? dayjs(
        `${getDate(episode.releaseDate)} ${episode.releaseHour}:${
          episode.releaseMinute
        }`,
        "d/MMM/Y h:m"
      ).tz("America/Mexico_City")
    : null;

  $: isEpisodeReleased = dayjs()
    .tz("America/Mexico_City")
    // .subtract(30, "seconds")
    .isAfter(releaseDate);

  // TODO: fix season number dislplay (always displays 1)
</script>

<div>
  <h2>
    T1E{episode.episodeNumber}
    "{episode.title}"
  </h2>

  <p>
    {episode.year} • {episode.duration}
    • Disponible
    {#if !isEpisodeReleased}
      el <b>{releaseDate.format("DD/MMM/YYYY hh:mm A")}</b>
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
