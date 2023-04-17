<script lang="ts">
  import SeasonSearch from "./season-search/SeasonSearch.svelte";
  import SeasonSelect from "./season-select/SeasonSelect.svelte";
  import OnconceptosLogo from "./svg/OnconceptosLogo.svelte";

  export let title: string = "onconceptos";
</script>

<header>
  <OnconceptosLogo type="color" width={200} alt={title} />

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

  div.content {
    display: inline-flex;
    justify-content: center;
  }
</style>
