<script lang="ts">
  import { isMobile, isTablet } from "../store";
  import CurrentUser from "./CurrentUser.svelte";
  import SeasonSearch from "./season-search/SeasonSearch.svelte";
  import SeasonSelect from "./season-select/SeasonSelect.svelte";
  import MenuBars from "./svg/MenuBars.svelte";
  import OnconceptosLogo from "./svg/OnconceptosLogo.svelte";

  export let title: string = "onconceptos";
</script>

<header>
  <OnconceptosLogo type="color" width={200} alt={title} />

  <div class="content">
    {#if !$isMobile && !$isTablet}
      <SeasonSelect />
      <SeasonSearch />
    {/if}

    {#if !$isMobile}
      <CurrentUser />
    {/if}

    {#if $isMobile || $isTablet}
      <MenuBars />
    {/if}
  </div>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;

    min-height: 10ch;
    width: 100%;

    background-color: white;
  }

  div.content {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;

    padding-right: 1ch;
    padding-left: 1ch;
  }

  @media screen and (max-width: 1300px) {
    header {
      min-height: 10ch;
    }
  }
</style>
