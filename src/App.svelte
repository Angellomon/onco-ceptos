<script lang="ts">
  import { onMount } from "svelte";
  import TimeMe from "timeme.js";

  import {
    loadSeriesData,
    loadSavedData,
    getCurrentUser,
    verifyInstalledVersion,
    registerUserVisit,
    registerUserUsageTimeInSeconds,
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

    TimeMe.initialize({
      currentPageName: "site-onconceptos", // current page
      idleTimeoutInSeconds: 240, // seconds
    });

    const data = await loadSeriesData();

    episodesStore.set(data.episodes);
    seasonsStore.set(data.seasons);

    loadSavedData();

    verifyInstalledVersion();

    const autoRegister = JSON.parse(
      import.meta.env.VITE_MSD_AUTO_REGISTER ?? "false"
    );

    const user = await getCurrentUser();

    currentUser.set(user);

    if (autoRegister) {
      console.log("auto registering");

      await registerUserVisit(user);
    }

    dataIsLoading.set(false);
  });

  async function loadStart() {}

  async function beforeUnload(event: BeforeUnloadEvent) {
    const message = null;
    (event || window.event).returnValue = message;

    await registerUserUsageTimeInSeconds();

    return message;
  }
</script>

<svelte:window on:beforeunload|preventDefault={beforeUnload} />

<Routes />
