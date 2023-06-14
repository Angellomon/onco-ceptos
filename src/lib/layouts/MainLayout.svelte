<script lang="ts">
  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";
  import EpisodeInfoModal from "../components/episode-info-modal/EpisodeInfoModal.svelte";
  import SeasonsListing from "../components/seasons-listing/SeasonsListing.svelte";
  import SelectedEpisode from "../components/SelectedEpisode.svelte";
  import Title from "../components/Title.svelte";
  import { dataIsLoading, isMenuOpen, localUser } from "../store";
  import Loading from "./Loading.svelte";
  import MobileMenu from "../components/mobile-menu/MobileMenu.svelte";
  import DataCollect from "../components/data-collect/DataCollect.svelte";

  let submitted: boolean;

  $: shoulCollectData = !$localUser || !submitted;
  // !$localUser || !!activeRegistrationError || !!activeDataCollectionError;

  // $: activeRegistrationError = ["null", "{}"].includes($registrationErrorJson);
  // $: activeDataCollectionError = ["null", "{}"].includes(
  //   $dataCollectionErrorJson
  // );
</script>

{#if $dataIsLoading}
  <Loading />
{:else}
  <main>
    <Header />
    <SelectedEpisode />
    <SeasonsListing />
    <Title />
    <Footer />
    <EpisodeInfoModal />
    {#if $isMenuOpen}
      <MobileMenu />
    {/if}
    {#if shoulCollectData}
      <DataCollect bind:submitted />
    {/if}
  </main>
{/if}

<style>
  main {
    position: relative;
  }
</style>
