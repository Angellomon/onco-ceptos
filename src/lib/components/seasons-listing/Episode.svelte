<script lang="ts">
  import { fade } from "svelte/transition";
  import type { EpisodeType } from "../../../types/series";
  import { selectedEpisode, seasonsStore, selectedSeason } from "../../store";
  import { saveData } from "../../utils";
  import PlayButton from "../svg/PlayButton.svelte";
  import FavButton from "./FavButton.svelte";
  import InfoButton from "./InfoButton.svelte";

  export let episode: EpisodeType;

  let episodeHover = false;
  let infoHover = false;
  let favHover = false;
  let showInfo = false;
  let infoModalHidden = true;

  function showEpisodeInfo() {
    showInfo = true;
    infoModalHidden = false;
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
    if (infoHover) return showEpisodeInfo();
    if (favHover) return addEpisodeToFavorites();

    console.log("hmmm 2");

    return setCurrentEpisode();
  }

  function handleKeyDown() {
    return (e) => {
      console.log(e);
    };
  }

  function handleMouseOver() {
    return () => {
      episodeHover = true;
    };
  }

  function handleMouseLeave() {
    return () => {
      episodeHover = false;
    };
  }

  $: style = `background: no-repeat center/100% url('/preview-img/${episode.portraitUrl}') ;`;
</script>

<div
  class="episode-box"
  {style}
  on:click={handleEpisodeClick}
  on:focus={() => {}}
  on:keypress={handleKeyDown()}
  on:mouseover={handleMouseOver()}
  on:mouseleave={handleMouseLeave()}
>
  {#if episodeHover}
    <InfoButton bind:hover={infoHover} />
    <FavButton bind:hover={favHover} />
    <div
      in:fade={{ duration: 100 }}
      class="title-hover"
      on:click={handleEpisodeClick}
      on:keypress={() => {}}
    >
      <PlayButton />
    </div>
  {:else}
    <div in:fade={{ duration: 100 }} class="title-wrapper">
      <h3>
        {episode.title}
      </h3>
    </div>
  {/if}
</div>

<style>
  h3 {
    color: white;
    height: 100%;
    width: 95%;
    text-align: center;

    font-size: 30px;
    line-height: 35px;
  }

  div.title-hover {
    /* height: 100%; */
    width: 100%;
    min-height: 250px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    backdrop-filter: brightness(0.8);
    /* backdrop-filter: blur(2px); */
  }

  div.title-wrapper {
    height: 100%;
    width: 100%;

    min-height: 250px;
    backdrop-filter: brightness(0.8);
    align-self: center;
    justify-self: center;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  div.episode-box {
    /* min-height: 20vh; */

    background-size: cover;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    cursor: pointer;
  }
</style>
