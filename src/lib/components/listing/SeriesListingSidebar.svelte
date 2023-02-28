<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  import { seriesStore, selectedSeries } from "../../store";

  onMount(() => {
    if ($seriesStore.length > 0) selectedSeries.set($seriesStore[0]);
  });

  function handleSeriesClick(title: string) {
    const i = $seriesStore.findIndex((s) => s.title == title);

    if (i < 0) return;

    selectedSeries.set($seriesStore[i]);
  }
</script>

<div class="series-sidebar">
  <ul class="series-listing" in:fly={{ duration: 500, opacity: 1, x: -200 }}>
    {#each $seriesStore as series}
      <li
        class="series-element"
        class:selected={$selectedSeries?.title == series.title}
        on:click={() => handleSeriesClick(series.title)}
        on:keydown={() => {}}
      >
        {series.title}
      </li>
    {/each}
  </ul>
</div>

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
