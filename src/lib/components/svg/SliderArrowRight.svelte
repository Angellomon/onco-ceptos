<script>
  import arrowSVGSource from "../../../assets/boton-avance_derecha.svg";

  export let width = 20;
  export let hover = false;
</script>

<img class:hover {width} src={arrowSVGSource} alt="->" />

<style>
  img {
    position: absolute;
    left: 15px;
    top: 30%;

    transition: all 0.2s ease-in-out;
  }

  img.hover {
    transform: scale(1.3);
  }
</style>
