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
    min-height: 50vh;

    display: flex;
    flex-direction: column;

    width: 100vw;
    /* width: 100%; */

    min-height: 500px;
    height: 50%;

    position: relative;
  }
</style>
