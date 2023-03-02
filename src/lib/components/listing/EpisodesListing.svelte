<script lang="ts">
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import type { EpisodeType } from "../../../types/series";
  import {
    episodesStore,
    selectedSeries,
    selectedEpisode,
    episodeAlreadyClicked,
  } from "../../store";

  let hoveredEpisode: EpisodeType | null = null;
  let firstClickTimeout: any; // bugfix: on first time render, it won't scroll into episode's section

  onDestroy(() => {
    clearTimeout(firstClickTimeout);
  });

  function handleEpisodeHover(episodeTitle: string) {
    const i = $episodesStore.findIndex((e) => e.title == episodeTitle);

    if (i < 0) return;

    hoveredEpisode = $episodesStore[i];
  }

  function handleMouseLeave() {
    hoveredEpisode = null;
  }

  function handleEpisodeClick(episodeTitle: string) {
    const i = $episodesStore.findIndex((e) => e.title == episodeTitle);

    if (i < 0) return;

    selectedEpisode.set($episodesStore[i]);

    firstClickTimeout = setTimeout(
      () => {
        document
          .getElementById("episodes-title")
          .scrollIntoView({ behavior: "smooth", block: "start" });

        clearTimeout(firstClickTimeout);
        episodeAlreadyClicked.set(true);
      },
      $episodeAlreadyClicked ? 100 : 300
    );
  }
</script>

<ul class="episodes-list">
  {#each $episodesStore.filter((e) => e.seriesTitle == $selectedSeries?.title) as episode (episode.title)}
    <li
      class="episode-element"
      style={`background-image: url("/preview-img/${episode.previewUrl}")`}
      on:mouseenter={() => handleEpisodeHover(episode.title)}
      on:mouseleave={() => handleMouseLeave()}
      on:click={() => handleEpisodeClick(episode.title)}
      on:keypress={() => {}}
    >
      <b>{episode.title}</b>
      <span class="episode-number">{episode.episodeNumber}</span>

      {#if hoveredEpisode && hoveredEpisode.title == episode.title}
        <div transition:fade={{ duration: 200 }} class="episode-description">
          <p>{episode.description}</p>
        </div>
      {/if}
    </li>
  {/each}
</ul>

<style>
  ul li {
    list-style-type: none;
    background: transparent;
    text-decoration: none;
  }

  ul.episodes-list {
    background: transparent;

    display: flex;
    flex-wrap: wrap;

    gap: 15px;
    float: right;
  }

  li.episode-element {
    height: 150px;
    width: 17vw;

    background-size: cover;

    padding: 1% 2%;

    position: relative;
  }

  li.episode-element::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(#fff6d3, transparent);
  }

  li.episode-element:hover {
    background-color: var(--secondary-color);
    cursor: pointer;

    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  }

  span.episode-number {
    position: absolute;

    right: 10px;
    bottom: 10px;

    height: 25px;
    width: 25px;

    font-weight: bold;

    text-align: center;
    vertical-align: middle;
    /* text-decoration: underline; */

    border-radius: 50%;
    background-color: var(--secondary-color);

    z-index: 10;
  }

  div.episode-description p {
    margin: 0;
    line-height: 1.3;
    font-size: 15px;
  }

  div.episode-description {
    position: absolute;
    z-index: 10;
    background-color: #fff6d3;

    width: 70%;
    height: 50%;

    bottom: 5%;
    left: 5%;

    /* border-radius: 10px; */

    padding: 2% 5%;
    /* 
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75); */
  }

  b {
    position: absolute;
    z-index: 10;
  }
</style>
