<script>
  import { fade, fly } from "svelte/transition";

  import plusSVGSource from "../../../assets/simbolo-mas_azul.svg";

  export let width = 20;

  export let bottom = 0;
  export let left = 0;

  export let hover = false;

  const style = `bottom: ${bottom}px; left: ${left}px;`;

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

<div
  class="wrapper"
  on:mouseover={handleMouseOver()}
  on:mouseleave={handleMouseLeave()}
  on:focus={() => {}}
  in:fade={{ duration: 100 }}
>
  <img class:hover src={plusSVGSource} {width} {style} alt=">" />

  {#if hover}
    <p transition:fly={{ x: -30 }}>Información</p>
  {/if}
</div>

<style>
  div.wrapper {
    background: white;

    /* border: 3px solid var(--secondary-color); */
    border-radius: var(--btn-border-radius);

    position: absolute;
    z-index: 10;
    bottom: 5px;
    left: 5px;

    padding: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  div.wrapper p {
    font-family: "Invention Bold";
    font-size: 18px;
    display: inline;

    margin: 0 5px;

    color: var(--secondary-color);
  }

  img {
    transition: all 0.2s ease-in-out;
  }

  img.hover {
    transform: scale(1.2);
  }
</style>
