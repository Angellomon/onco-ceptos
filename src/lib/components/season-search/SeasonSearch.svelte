<script lang="ts">
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import type { EpisodeType } from "../../../types/series";
  import { searchText, episodesStore, selectedEpisode } from "../../store";
  import Search from "../svg/Search.svelte";
  import { isMenuOpen } from "../../store";

  let isMouseOver = false;
  let searchResults: EpisodeType[] = [];

  function handleResultClick(episode: EpisodeType) {
    return () => {
      if (episode.pendingRelease) return;

      $selectedEpisode = episode;
      searchResults = [];

      $isMenuOpen = false;
      $searchText = null;
    };
  }

  function handleClick() {
    return () => {
      console.log($searchText);
    };
  }

  function handleMouseOver() {
    return () => {
      isMouseOver = true;
    };
  }

  function handleMouseLeave() {
    return () => {
      isMouseOver = false;
    };
  }

  $: searchResults = $episodesStore.filter(
    (ep) =>
      $searchText &&
      (ep.title.toLocaleLowerCase().search($searchText.toLowerCase()) >= 0 ||
        ep.description.toLocaleLowerCase().search($searchText.toLowerCase()) >=
          0)
  );
</script>

<div
  class="search"
  on:mouseover={handleMouseOver()}
  on:mouseleave={handleMouseLeave()}
  on:keypress={() => {}}
  on:focus={() => {}}
>
  <Search on:click={handleClick()} hover={isMouseOver} />
  <input placeholder="Buscar" type="text" bind:value={$searchText} />

  {#if searchResults.length > 0}
    <ul class="search-results">
      {#each searchResults as ep (ep.id)}
        <li
          animate:flip={{ duration: 300 }}
          transition:fade
          on:click={handleResultClick(ep)}
          on:keypress={() => {}}
        >
          {ep.title}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  ul.search-results {
    position: absolute;
    top: 80px;

    width: 95%;

    list-style-type: none;

    background-color: transparent;

    color: var(--dark-background);

    border: none;

    padding: 0 1em 0 0;
    margin: 0;

    font-family: inherit;
    font-size: var(--font-size);
    line-height: inherit;

    cursor: pointer;

    z-index: 50;
  }

  ul li {
    width: var(--select-width);
    border-top: var(--search-border);
    border-left: var(--search-border);
    border-right: var(--search-border);

    background-color: white;
    padding: 10px 15px;

    z-index: 10;
  }

  li:hover {
    color: var(--secondary-color);
    transition: color 0.5s;
  }

  ul :first-child {
    border-top-left-radius: var(--search-border-radius);
    border-top-right-radius: var(--search-border-radius);
  }

  ul :last-child {
    border-bottom-left-radius: var(--search-border-radius);
    border-bottom-right-radius: var(--search-border-radius);
    border-bottom: var(--search-border);
  }

  div.search {
    --font-size: 20px;
    --input-left-padding: 50px;

    --search-width: 100%;
    --search-height: 30px;

    --search-border-radius: 20px;
    --search-border: 1px solid white;
    --search-bottom-offset: -160%;
    /* --search-bottom-offset: -115%; */
    --search-right-offset: 0px;

    --select-button-width: 200px;
    --search-select-width: 160px;
    --font-size: 20px;

    align-self: center;
    position: relative;
    padding-left: 0;
  }

  input {
    appearance: none;
    border-radius: 5px;
    height: var(--search-height);
    /* width: var(--search-width); */

    align-self: center;
    border: 3px solid rgba(0, 0, 0, 0.1);

    margin-right: 20px;

    padding: 5px 10px;

    padding-left: var(--input-left-padding);

    font-size: var(--font-size);
  }

  input:focus,
  input:focus-visible {
    border: 3px solid var(--primary-color);
    /* border: none; */
    outline: none !important;
  }
</style>
