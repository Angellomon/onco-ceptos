<script lang="ts">
  import type { ShowcaseType } from "../../types/showcase";
  import { generateTestData } from "../utils";
  import ShowcaseElement from "./ShowcaseElement.svelte";

  export let showcases: ShowcaseType[] = generateTestData({
    limit: 5,
  });
</script>

<section>
  {#each showcases as showcase}
    <ShowcaseElement {showcase} />
  {/each}
</section>

<style>
  section {
    background-color: var(--dark-background);

    width: 100vw;
    height: 100%;

    min-height: 70vh;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
