<script lang="ts">
  import { onMount } from "svelte";
  import "@vime/core/themes/default.css";
  import "@splidejs/svelte-splide/css";

  import { loadSeriesData, loadSavedData, getCurrentUser } from "./lib/utils";
  import {
    episodesStore,
    seasonsStore,
    dataIsLoading,
    currentUser,
  } from "./lib/store";
  import Routes from "./routing/Routes.svelte";

  onMount(async () => {
    dataIsLoading.set(true);

    const data = await loadSeriesData();

    episodesStore.set(data.episodes);
    seasonsStore.set(data.seasons);

    loadSavedData();

    const user = await getCurrentUser();

    console.log(user);

    currentUser.set(user);

    dataIsLoading.set(false);
  });
</script>

<Routes />
