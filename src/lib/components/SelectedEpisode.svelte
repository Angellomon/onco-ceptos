<script lang="ts">
  import { fade } from "svelte/transition";
  import { selectedEpisode, episodesStore } from "../store";
  import EpisodePlayer from "./player/EpisodePlayer.svelte";

  const defaultSectionStyle = "background: var(--secondary-color);";

  function buildUrl(previewUrl: string) {
    return `/preview-img/${previewUrl}`;
  }

  function buildSectionStyle(previewUrl: string) {
    const url = buildUrl(previewUrl);

    return `background: url(${url}) no-repeat center center fixed;`;
  }

  function buildSectionWithFirstEpisode() {
    const firstEpisode = $episodesStore[0];

    if (!firstEpisode) return defaultSectionStyle;

    const url = buildUrl(firstEpisode.previewUrl);

    console.log(firstEpisode.previewUrl);

    return `background: url(${url}) no-repeat center center fixed;`;
  }

  $: sectionStyle = $selectedEpisode
    ? buildSectionStyle($selectedEpisode.previewUrl)
    : buildSectionWithFirstEpisode();
</script>

<section transition:fade style={sectionStyle}>
  <div class="episode-controls">
    <EpisodePlayer widthPercent={60} />
    <div class="episode-buttons">
      <button class="info">Más información</button>
      <button class="next">Siguiente capítulo</button>
    </div>
  </div>
  <div class="episode-info" />
</section>

<style>
  button {
    background-color: white;

    font-size: 22px;

    border-radius: 20px;

    padding: 10px 20px;

    /* border-radius: 20px; */
    border: none;

    width: 100%;

    cursor: pointer;
  }

  section {
    height: 60vh;
    width: 100%;

    position: relative;

    background-image: linear-gradient(
      0deg,
      rgba(12, 35, 64, 1) 0%,
      rgba(255, 255, 255, 0.01) 70%
    );

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;

    padding-left: 5%;
  }

  section::after {
    position: absolute;
    height: 100%;
    width: 100%;

    right: 0;
    top: 0;
    content: "";

    filter: brightness(0.7);
    background: linear-gradient(
      0deg,
      rgba(12, 35, 64, 1) 5%,
      rgba(255, 255, 255, 0) 35%
    );
  }
  section::before {
    position: absolute;
    height: 100%;
    width: 100%;

    right: 0;
    top: 0;
    content: "";
  }

  div.episode-controls {
    display: flex;
    justify-content: space-around;
    align-items: center;

    flex-direction: row;
    flex-wrap: wrap;

    height: 40vh;
    width: 60%;
  }

  div.episode-buttons {
    display: flex;

    flex-direction: column;
    justify-content: space-evenly;

    align-content: space-evenly;
    align-items: center;
    height: 20vh;

    z-index: 10;
  }
</style>
