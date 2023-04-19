<script>
  import { seasonsStore } from "../../store";
  import SeasonItem from "./SeasonItem.svelte";
</script>

<section>
  {#each $seasonsStore as season}
    <SeasonItem {season} />
  {/each}
</section>

<style>
  section {
    min-height: 500px;
    height: 50vh;

    display: flex;
    flex-direction: column;

    width: 100%;

    min-height: 500px;
    height: 50vh;
  }
</style>
