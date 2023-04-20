<script>
  import { fly, slide } from "svelte/transition";
  import Spin from "../../../assets/spin-onconceptos.svg";

  export let width = 200;
  export let bottom = 0;
  export let right = 0;
  export let left = 0;
  export let duration = 1000;

  let style = `bottom: ${bottom}px; right: ${right}px; `;
</script>

<img
  {width}
  {style}
  src={Spin}
  alt="cargando..."
  transition:fly={{ x: 300, duration }}
/>

<style>
  img {
    position: absolute;
    z-index: -10;

    animation-name: spin;
    animation-duration: 69000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
