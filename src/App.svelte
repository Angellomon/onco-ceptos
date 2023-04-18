<script lang="ts">
  import { onMount } from "svelte";
  import "@vime/core/themes/default.css";

  import { loadSeriesData, loadSavedData } from "./lib/utils";
  import { episodesStore, seasonsStore, dataIsLoading } from "./lib/store";
  import Routes from "./routing/Routes.svelte";

  onMount(async () => {
    dataIsLoading.set(true);

    const data = await loadSeriesData();

    episodesStore.set(data.episodes);
    seasonsStore.set(data.seasons);

    loadSavedData();

    dataIsLoading.set(false);
  });
</script>

<Routes />
