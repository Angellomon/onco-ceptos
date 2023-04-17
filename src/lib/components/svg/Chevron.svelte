<script>
  import ChevronSVG from "../../../assets/chevron-down-solid.svg";

  export let width = 15;

  export let marginLeft = 10;
  export let marginRight = 10;

  export let hover = false;

  const style = `margin-left: ${marginLeft}px; margin-right: ${marginRight}px;`;
</script>

<img class:hover src={ChevronSVG} {width} alt=">" {style} />

<style>
  img {
    transition: all 0.2s ease-in-out;
  }

  img.hover {
    transform: scale(1.3);
  }
</style>
