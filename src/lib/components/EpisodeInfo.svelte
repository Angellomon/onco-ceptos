<script lang="ts">
  import dayjs from "dayjs";
  import "dayjs/locale/es";
  import type { EpisodeType } from "../../types/series";

  export let episode: EpisodeType;

  $: releaseDate = episode
    ? dayjs(
        `${episode.releaseDate} ${episode.releaseHour}:${episode.releaseMinute}`,
        "d/MMM/Y h:m"
      ).tz("America/Mexico_City")
    : null;

  $: isEpisodeReleased = dayjs()
    .tz("America/Mexico_City")
    // .subtract(30, "seconds")
    .isAfter(releaseDate);

  $: {
    console.log(releaseDate);
    console.log(episode?.releaseHour, episode?.releaseMinute);
    console.log(isEpisodeReleased);
    console.log(dayjs().tz("America/Mexico_City").subtract(1, "hour"));
  }
</script>

<h2>
  {episode.title}
</h2>

<p>
  {episode.year} • {episode.duration}
  • Disponible
  {#if !isEpisodeReleased}
    el <b>{releaseDate.format("DD/MMM/YYYY hh:mm A")}</b>
  {/if}
</p>
<p>{episode.description}</p>

<style>
  h2 {
    text-align: left;

    font-size: 30px;
    line-height: 35px;
  }

  p {
    font-size: 18px;
  }
</style>
