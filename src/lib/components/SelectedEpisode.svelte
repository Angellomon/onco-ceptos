<script lang="ts">
  import { fade } from "svelte/transition";
  import { selectedEpisode, episodesStore } from "../store";
  import EpisodePlayer from "./player/EpisodePlayer.svelte";
  import ArrowRight from "./svg/ArrowRight.svelte";
  import Plus from "./svg/Plus.svelte";

  const defaultSectionStyle = "background: var(--secondary-color);";

  let infoHover = false;
  let nextHover = true;

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

    return `background: url(${url}) no-repeat center center fixed;`;
  }

  $: sectionStyle = $selectedEpisode
    ? buildSectionStyle($selectedEpisode.previewUrl)
    : buildSectionWithFirstEpisode();
  $: episode = $selectedEpisode || $episodesStore[0];
</script>

<section transition:fade style={sectionStyle}>
  <div class="episode-controls">
    <EpisodePlayer widthPercent={60} />

    <div class="episode-buttons">
      <button
        on:mouseover={() => {
          infoHover = true;
        }}
        on:mouseleave={() => {
          infoHover = false;
        }}
        on:focus={() => {}}
        class="info"><Plus hover={infoHover} /> Más información</button
      >

      <button
        on:mouseover={() => {
          nextHover = true;
        }}
        on:mouseleave={() => {
          nextHover = false;
        }}
        on:focus={() => {}}
        class="next"><ArrowRight hover={nextHover} /> Siguiente capítulo</button
      >
    </div>
  </div>

  <div class="episode-info">
    <h2>
      {episode.title}
    </h2>
    <p>{episode.year} • {episode.duration}</p>
    <p>{episode.description}</p>
  </div>
</section>

<style>
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
    border-radius: 30px;
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
    background-size: cover;

    display: flex;
    flex-direction: column;
    /* justify-content: space-evenly; */
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

    background: linear-gradient(
      0deg,
      rgba(12, 35, 64, 1) 5%,
      rgba(255, 255, 255, 0) 35%
    );
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

  div.episode-info {
    z-index: 10;
  }
</style>
