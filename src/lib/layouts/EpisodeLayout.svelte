<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";
  import EpisodeDescription from "../components/EpisodeDescription.svelte";
  import EpisodesListingSidebar from "../components/listing/EpisodesListingSidebar.svelte";
  import { selectedEpisode } from "../store";

  let sectionTitle = "";

  function setupSectionTitle() {
    const episodeTitle = $selectedEpisode?.seriesTitle;
    sectionTitle = `EPISODIOS ${episodeTitle ? "- " + episodeTitle : ""}`;
  }

  function handleEpisodeClose() {
    selectedEpisode.set(null);
  }

  $: setupSectionTitle();
</script>

<section transition:slide={{ delay: 100 }}>
  <h1
    transition:fly={{
      duration: 300,
      x: -200,
    }}
    id="episodes-title"
  >
    {sectionTitle}
  </h1>

  <div class="content">
    <EpisodesListingSidebar />
    <EpisodeDescription />
  </div>

  <span
    transition:fly={{
      duration: 300,
      x: 200,
    }}
    on:click={handleEpisodeClose}
    on:keydown={() => {}}
    class="close-episode">Cerrar</span
  >
</section>

<style>
  h1 {
    color: var(--light-background);
    margin: 0 4%;
    background-color: var(--primary-color);
  }

  section {
    background-color: var(--primary-color);

    padding: 2% 1%;
    margin: 0;

    /* min-height: 70vh; */

    position: relative;
  }

  div.content {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-around;

    width: 100%;
    height: 100%;
    padding: 2% 1%;
    vertical-align: middle;
  }

  /* span.close-episode::before {
    content: "x";
    font-family: monospace;
    margin-right: 5px;
  } */

  span.close-episode {
    font-size: 20px;

    position: absolute;
    top: 2vw;
    right: 3vw;

    color: white;

    vertical-align: middle;

    border: 1px solid white;
    border-radius: 5px;

    padding: 5px 10px;
  }

  span.close-episode:hover {
    background-color: white;
    color: var(--primary-color);
    cursor: pointer;
  }
</style>
