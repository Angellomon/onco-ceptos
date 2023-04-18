<script lang="ts">
  import Header from "../components/Header.svelte";
  import Title from "../components/Title.svelte";
  import { dataIsLoading } from "../store";
  import Loading from "./Loading.svelte";
</script>

{#if $dataIsLoading}
  <Loading />
{:else}
  <main>
    <Header />
    <Title />
  </main>
{/if}
