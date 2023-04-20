<script>
  import prevButtonSVGSource from "../../../assets/boton-avance_izquierda.svg";

  export let width = 20;
  let hover = false;

  function handleMouseOver() {
    return () => {
      hover = true;
    };
  }

  function handleMouseLeave() {
    return () => {
      hover = false;
    };
  }
</script>

<img
  class:hover
  {width}
  on:mouseover={handleMouseOver()}
  on:mouseleave={handleMouseLeave()}
  on:focus={() => {}}
  src={prevButtonSVGSource}
  alt="<"
/>

<style>
  img {
    /* position: absolute; */

    transition: all 0.2s ease-in-out;

    cursor: pointer;

    height: 100%;
    width: 55px;

    z-index: 10;
  }

  img.hover {
    transform: scale(1.2);
  }
</style>
