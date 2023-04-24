<script lang="ts">
  import { fly } from "svelte/transition";
  import type { SeasonType } from "../../../types/series";
  import { seasonsStore, selectedSeason } from "../../store";
  import { saveData } from "../../utils";
  import Chevron from "../svg/Chevron.svelte";

  let submenuVisible = false;
  let isMouseOver = false;

  let title = $selectedSeason?.title || "Temporadas";

  function handleSeasonSelect(season: SeasonType) {
    return () => {
      selectedSeason.set(season);
      saveData();
      submenuVisible = false;

      const el = document.getElementById(season.id);

      if (!el) return;

      el.scrollIntoView({
        behavior: "smooth",
      });
    };
  }

  function handleSeasonClick() {
    return () => {
      submenuVisible = !submenuVisible;
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

  $: title = $selectedSeason?.title || "Temporadas";
</script>

<div
  class="select"
  on:mouseover={handleMouseOver()}
  on:mouseleave={handleMouseLeave()}
  on:keypress={() => {}}
  on:focus={() => {}}
>
  <button on:click={handleSeasonClick()}>
    {title}
    <Chevron hover={isMouseOver} />
  </button>
  {#if submenuVisible}
    <ul transition:fly={{ y: -50 }}>
      {#each $seasonsStore as season (season.id)}
        <li
          class:is-selected={$selectedSeason
            ? $selectedSeason.id === season.id
            : false}
          on:click={handleSeasonSelect(season)}
          on:keypress={() => {}}
        >
          {season.title}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  div.select {
    --submenu-border-radius: 20px;
    --submenu-border: 1px solid white;
    --submenu-bottom-offset: -160%;
    /* --submenu-bottom-offset: -115%; */
    --submenu-right-offset: 0px;

    --select-button-width: 200px;
    --submenu-select-width: 160px;
    --font-size: 20px;

    height: 100%;

    text-align: center;
    align-self: center;

    position: relative;

    padding: 0 45px;
    padding-right: 0;
    margin-right: 10px;

    cursor: pointer;
  }

  button {
    height: 100%;
    width: var(--select-button-width);

    cursor: pointer;

    background-color: white;
    border: 1px solid white;

    font-size: var(--font-size);
    color: var(--secondary-color);
  }

  ul {
    position: absolute;

    width: var(--submenu-select-width);

    bottom: var(--submenu-bottom-offset);
    right: var(--submenu-right-offset);

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
    border-top: var(--submenu-border);
    border-left: var(--submenu-border);
    border-right: var(--submenu-border);

    background-color: white;
    padding: 10px 15px;

    z-index: 10;
  }

  li.is-selected,
  li:hover {
    color: var(--secondary-color);
    transition: color 0.5s;
  }

  ul :first-child {
    border-top-left-radius: var(--submenu-border-radius);
    border-top-right-radius: var(--submenu-border-radius);
  }

  ul :last-child {
    border-bottom-left-radius: var(--submenu-border-radius);
    border-bottom-right-radius: var(--submenu-border-radius);
    border-bottom: var(--submenu-border);
  }
</style>
