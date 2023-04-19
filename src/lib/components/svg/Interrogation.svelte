<script>
  import interrogationSVGSource from "../../../assets/signo-interrogacion.svg";

  export let width = 15;
  export let hover = false;
</script>

<img class:hover {width} src={interrogationSVGSource} alt="?" />

<style>
  img {
    position: absolute;
    left: 15px;
    top: 25%;

    transition: all 0.2s ease-in-out;
  }

  img.hover {
    transform: scale(1.3);
  }
</style>
