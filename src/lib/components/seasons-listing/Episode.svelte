<script lang="ts">
  import { fade } from "svelte/transition";
  import type { EpisodeType } from "../../../types/series";
  import {
    selectedEpisode,
    seasonsStore,
    selectedSeason,
    selectedEpisodeInfo,
  } from "../../store";
  import { saveData } from "../../utils";
  import PlayButton from "../svg/PlayButton.svelte";
  import InfoButton from "./InfoButton.svelte";

  export let episode: EpisodeType;

  let episodeHover = false;
  let infoHover = false;
  let favHover = false;

  function showEpisodeInfo() {
    $selectedEpisodeInfo = episode;
  }

  function addEpisodeToFavorites() {}

  function setCurrentEpisode() {
    $selectedEpisode = episode;
    const season = $seasonsStore.find((se) => se.id == episode.seasonId);

    if (!season) return;

    $selectedSeason = season;

    goTop();
    saveData();
  }

  function goTop() {
    document.body.scrollIntoView({
      behavior: "smooth",
    });
  }

  function handleEpisodeClick() {
    console.log(episode);

    // if (episode.pendingRelease) return;

    if (infoHover) return showEpisodeInfo();
    if (favHover) return addEpisodeToFavorites();

    return setCurrentEpisode();
  }

  function handleKeyDown(e) {
    console.log(e);
  }

  function handleMouseOver() {
    console.log("enter");
    episodeHover = true;
  }

  function handleMouseLeave() {
    episodeHover = false;

    console.log("leave");
  }

  $: style = `background: no-repeat center/100% url('${episode.portraitUrl}'); background-size: cover;`;
</script>

{#if episode.pendingRelease}
  <div class="pending-release">
    <div in:fade={{ duration: 100 }} class="title-wrapper">
      <h3>PRÓXIMAMENTE</h3>
    </div>
  </div>
{:else}
  <div
    class="episode-box"
    {style}
    on:click={handleEpisodeClick}
    on:focus={() => {}}
    on:keypress={handleKeyDown}
    on:mouseover={handleMouseOver}
    on:mouseleave={handleMouseLeave}
  >
    <InfoButton bind:hover={infoHover} />
    <!-- <FavButton bind:hover={favHover} /> -->
    <!-- <div
        in:fade={{ duration: 100 }}
        class="title-hover"
        on:click={handleEpisodeClick}
        on:keypress={() => {}}
      >
    </div> -->
    <div in:fade={{ duration: 100 }} class="title-wrapper">
      <PlayButton bind:hover={episodeHover} />
      <h3>
        {episode.title}
      </h3>
    </div>
  </div>
{/if}

<style>
  h3 {
    color: white;
    height: 100%;
    width: 90%;
    /* text-align: center; */

    font-size: 30px;
    line-height: 30px;

    text-shadow: 1px 0px 30px rgba(1, 1, 1, 0.5);

    position: absolute;
    right: 0;
    left: 0;
    top: 10%;
    bottom: 0;
    margin: auto;
  }

  /* div.title-hover {
    height: 100%;
    width: 100%;
    min-height: 250px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    backdrop-filter: brightness(0.8);
  } */

  div.title-wrapper {
    width: 100%;
    min-width: 30vw;

    height: 250px;
    backdrop-filter: brightness(0.8);

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
  }

  div.episode-box {
    /* min-height: 20vh; */
    width: 100%;

    min-width: 30vw;

    background-size: cover;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    cursor: pointer;
  }

  div.pending-release {
    background-color: var(--primary-color);
    cursor: default;
  }
</style>
