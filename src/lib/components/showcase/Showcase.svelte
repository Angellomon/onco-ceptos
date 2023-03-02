<script lang="ts">
  import type { ShowcaseType } from "../../../types/series";
  import { showcaseStore } from "../../store";
  import ShowcaseElement from "./ShowcaseElement.svelte";
</script>

<section>
  <h1>DESTACADOS</h1>

  <div class="content">
    {#each $showcaseStore as showcase}
      <ShowcaseElement {showcase} />
    {/each}
  </div>
</section>

<style>
  h1 {
    color: var(--light-background);
    margin: 0 4%;
  }

  section {
    background-color: var(--dark-background);

    /* min-height: 55vh; */

    flex-direction: column;

    display: flex;
    justify-content: center;
    -webkit-box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    padding-bottom: 4vh;
    padding-top: 4vh;
  }

  div.content {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
