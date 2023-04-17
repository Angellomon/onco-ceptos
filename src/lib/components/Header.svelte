<script lang="ts">
  import SeasonSearch from "./season-search/SeasonSearch.svelte";
  import SeasonSelect from "./season-select/SeasonSelect.svelte";

  export let title: string = "onconceptos";
</script>

<header>
  <!-- <img class="logo" src="onconceptos-logo.png" alt={title} /> -->
  <h1>{title}</h1>
  <div class="content">
    <SeasonSelect />
    <SeasonSearch />
  </div>
</header>

<style>
  header {
    display: inline-flex;
    justify-content: space-between;

    height: 100px;
    width: 100vw;

    background-color: white;
  }

  /* img.logo {
    font-size: 20px;
    min-width: 150px;
  } */

  h1 {
    align-self: center;

    background-image: linear-gradient(
      90deg,
      var(--primary-color) 38%,
      var(--secondary-color) 38%
    );

    margin-left: 10px;
    margin-top: 0px;
    margin-bottom: 0px;

    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  div.content {
    display: inline-flex;
    justify-content: center;
  }
</style>
