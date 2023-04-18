<script lang="ts">
  import { fade } from "svelte/transition";
  import { selectedEpisode, episodesStore } from "../store";

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

<section transition:fade style={sectionStyle} />

<style>
  section {
    height: 60vh;
    width: 100%;

    position: relative;

    filter: brightness(0.7);
    background-image: linear-gradient(
      0deg,
      rgba(12, 35, 64, 1) 0%,
      rgba(255, 255, 255, 0) 40%
    );
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

  /* div.gradient-wrapper {
    background: linear-gradient(0deg, rgba(12,35,64,1) 0%, rgba(255,255,255,0) 40%);;
    position: inherit;
  } */
</style>
