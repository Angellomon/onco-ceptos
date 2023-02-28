<script lang="ts">
  import { onMount } from "svelte";

  import { loadSeriesData } from "./lib/utils";
  import { episodesStore, seriesStore, showcaseStore } from "./lib/store";
  import MainLayout from "./lib/layouts/MainLayout.svelte";

  let ready = false;

  onMount(async () => {
    const data = await loadSeriesData();

    episodesStore.set(data.episodes);
    seriesStore.set(data.series);
    showcaseStore.set(data.showcase);

    ready = true;
  });
</script>

{#if ready}
  <MainLayout />
{:else}
  <p>cargando</p>
{/if}

<style>
</style>
