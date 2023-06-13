<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import xMarkSVGSource from "../../../assets/boton-cerrar.svg";
  import { fade } from "svelte/transition";

  export let width = 30;
  export let hover = false;

  const dispatch = createEventDispatcher();

  function handleCloseClick() {
    dispatch("click");
  }
</script>

<img
  on:click={handleCloseClick}
  on:keypress={() => {}}
  class:hover
  src={xMarkSVGSource}
  alt="x"
  transition:fade
  {width}
/>

<style>
  img {
    position: absolute;
    right: 15px;
    top: 15px;

    transition: all 0.2s ease-in-out;

    filter: invert(10%) sepia(31%) saturate(2808%) hue-rotate(190deg)
      brightness(93%) contrast(96%);
    cursor: pointer;
  }

  img.hover {
    transform: scale(1.3);
  }
</style>
