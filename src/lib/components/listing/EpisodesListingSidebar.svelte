<script lang="ts">
  // import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  import { episodesStore, selectedEpisode, selectedSeries } from "../../store";

  // onMount(() => {
  //   if ($episodesStore.length > 0) selectedEpisode.set($episodesStore[0]);
  // });

  function handleSeriesClick(title: string) {
    const i = $episodesStore.findIndex((e) => e.title == title);

    if (i < 0) return;

    selectedEpisode.set($episodesStore[i]);
  }
</script>

{#if $selectedEpisode}
  <div
    class="series-sidebar"
    transition:fly={{ duration: 500, opacity: 1, x: -200 }}
  >
    <ul class="series-listing">
      {#each $episodesStore.filter((e) => $selectedEpisode && e.seriesTitle === $selectedSeries.title) as episode}
        <li
          class="series-element"
          class:selected={$selectedEpisode?.title == episode.title}
          on:click={() => handleSeriesClick(episode.title)}
          on:keydown={() => {}}
        >
          {episode.title}
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  div.series-sidebar {
    width: 30vw;
  }

  ul,
  li {
    list-style-type: none;
  }

  ul.series-listing {
    list-style-type: none;
    background: transparent;
    text-decoration: none;
  }

  li.series-element {
    background: #fff6d3;

    padding: 5px 10%;

    margin-top: 5px;

    /* text-align: center; */

    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);

    font-size: var(--text-size);
  }

  li.series-element:first-child {
    margin-top: 0;
  }

  li.series-element:hover {
    background-color: var(--secondary-color);
    cursor: pointer;
  }

  li.selected {
    background-color: var(--secondary-color);
  }
</style>
