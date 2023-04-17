<script lang="ts">
  import { onMount } from "svelte";

  import { loadSeriesData } from "./lib/utils";
  import { episodesStore, seasonsStore, dataIsLoading } from "./lib/store";
  import Routes from "./routing/Routes.svelte";

  onMount(async () => {
    dataIsLoading.set(true);

    const data = await loadSeriesData();

    episodesStore.set(data.episodes);
    seasonsStore.set(data.seasons);

    dataIsLoading.set(false);
  });
</script>

<Routes />
