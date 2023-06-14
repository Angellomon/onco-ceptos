<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import XMark from "../svg/XMark.svelte";
  import { isMenuOpen } from "../../store";
  import FooterContent from "../footer/FooterContent.svelte";
  import CurrentUser from "../CurrentUser.svelte";
  import SeasonSearch from "../season-search/SeasonSearch.svelte";
  import SeasonSelect from "../season-select/SeasonSelect.svelte";
  import DebugData from "../debug/DebugData.svelte";
</script>

<div transition:slide class="menu-wrapper">
  <XMark
    on:click={() => {
      $isMenuOpen = false;
    }}
  />
  <div class="profile" transition:fade>
    <CurrentUser border={false} />
  </div>

  <div class="content">
    <SeasonSearch />
    <SeasonSelect />

    <DebugData />
  </div>

  <div class="footer" transition:fade>
    <FooterContent />
  </div>
</div>

<style>
  div.menu-wrapper {
    width: 100vw;
    height: 100vh;

    background-color: white;

    top: 0;

    z-index: 99999;

    position: fixed;
  }

  div.profile {
    position: absolute;
    top: 15px;
    left: 15px;
  }

  div.content {
    position: absolute;
    top: 10%;
    left: 15px;

    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: left;
    gap: 3ch;

    width: 100%;

    text-align: left;
  }

  div.footer {
    position: absolute;

    bottom: 0;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    padding: 30px 20px;

    justify-content: space-evenly;
    align-items: flex-start;
  }
</style>
