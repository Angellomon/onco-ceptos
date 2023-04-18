<script lang="ts">
  import { BarsRotateFade } from "svelte-svg-spinners";
  import { fade } from "svelte/transition";
</script>

<section transition:fade>
  <BarsRotateFade width={300} size={500} color="#ffffff" />
</section>

<style>
  section {
    height: 100vh;
    width: 100vw;
    display: flex;

    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
  }
</style>
