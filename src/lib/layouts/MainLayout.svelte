<script lang="ts">
  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";
  import SeasonsListing from "../components/seasons-listing/SeasonsListing.svelte";
  import SelectedEpisode from "../components/SelectedEpisode.svelte";
  import Title from "../components/Title.svelte";
  import { dataIsLoading } from "../store";
  import Loading from "./Loading.svelte";
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
  </main>
{/if}
