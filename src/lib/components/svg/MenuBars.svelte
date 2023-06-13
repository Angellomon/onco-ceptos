<script>
  // import ChevronSVG from "../../../assets/chevron-down-solid.svg";
  import MenuSVG from "../../../assets/bars-solid.svg";
  import { isMenuOpen } from "../../store";

  export let width = 15;

  export let marginLeft = 10;
  export let marginRight = 10;

  export let hover = false;

  const style = `margin-left: ${marginLeft}px; margin-right: ${marginRight}px;`;
</script>

<img
  class:hover
  on:mouseenter={() => {
    hover = true;
  }}
  on:mouseleave={() => {
    hover = false;
  }}
  on:click={() => {
    $isMenuOpen = !$isMenuOpen;
  }}
  on:keydown={() => {}}
  src={MenuSVG}
  alt=">"
  {style}
  {width}
/>

<style>
  img {
    right: 5px;

    transition: all 0.2s ease-in-out;
    filter: invert(9%) sepia(95%) saturate(866%) hue-rotate(184deg)
      brightness(97%) contrast(97%);
  }

  img.hover {
    transform: scale(1.3);
  }
</style>
