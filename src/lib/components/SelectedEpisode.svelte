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
    height: 50vh;
    width: 100%;

    position: relative;

    filter: brightness(0.7);
  }
</style>
