<script lang="ts">
  import type { ShowcaseType } from "../../../types/showcase";
  import { generateTestData } from "../../utils";
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

    width: 100%;
    height: 100%;

    min-height: 70vh;

    display: flex;
    justify-content: center;
    align-items: center;

    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
