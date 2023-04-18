<script>
  import svgSource from "../../../assets/flecha-adelante.svg";

  export let width = 20;

  export let hover = false;
</script>

<img class:hover {width} src={svgSource} alt=">" />

<style>
  img {
    position: absolute;
    left: 15px;
    top: 35%;

    transition: all 0.2s ease-in-out;
  }

  img.hover {
    transform: scale(1.3);
  }
</style>
