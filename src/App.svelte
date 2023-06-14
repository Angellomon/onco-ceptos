<script lang="ts">
  import { onMount } from "svelte";

  import {
    loadSeriesData,
    loadSavedData,
    getCurrentUser,
    verifyInstalledVersion,
    registerUserVisit,
  } from "./lib/utils";
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

    const autoRegister = JSON.parse(
      import.meta.env.VITE_MSD_AUTO_REGISTER ?? "false"
    );

    const user = await getCurrentUser();

    currentUser.set(user);

    if (autoRegister) {
      await registerUserVisit(user);
    }

    verifyInstalledVersion();

    dataIsLoading.set(false);
  });
</script>

<Routes />
