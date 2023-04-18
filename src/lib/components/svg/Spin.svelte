<script>
  import Spin from "../../../assets/spin-onconceptos.svg";

  export let width = 200;
  export let bottom = 0;
  export let right = 0;

  let style = `bottom: ${bottom}px; right: ${right}px;`;
</script>

<img {width} {style} src={Spin} alt="cargando..." />

<style>
  img {
    position: absolute;
  }
</style>
