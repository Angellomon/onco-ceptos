<script lang="ts">
  import { searchText } from "../../store";
  import Search from "../svg/Search.svelte";

  function handleClick() {
    return () => {
      console.log($searchText);
    };
  }
</script>

<div class="search">
  <Search on:click={handleClick()} />
  <input placeholder="Buscar" type="text" bind:value={$searchText} />
</div>

<style>
  div.search {
    --font-size: 20px;
    --input-left-padding: 50px;

    --search-width: 100%;
    --search-height: 30px;

    align-self: center;
    position: relative;
    padding-left: 0;
  }

  input {
    appearance: none;
    border-radius: 5px;
    height: var(--search-height);
    /* width: var(--search-width); */

    align-self: center;
    border: 3px solid rgba(0, 0, 0, 0.1);

    margin-right: 20px;

    padding: 5px 10px;

    padding-left: var(--input-left-padding);

    font-size: var(--font-size);
  }

  input:focus,
  input:focus-visible {
    border: 3px solid var(--primary-color);
    /* border: none; */
    outline: none !important;
  }
</style>
