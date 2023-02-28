<script lang="ts">
  import type { ShowcaseType } from "../../../types/series";
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
    -webkit-box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  }
</style>
