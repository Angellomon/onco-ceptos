<script>
  import { fade, fly } from "svelte/transition";

  import starSVGSource from "../../../assets/estrella.svg";

  export let width = 20;

  export let bottom = 5;
  export let right = 5;

  export let hover = false;

  const style = `bottom: ${bottom}px; right: ${right}px;`;

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
  on:click={(e) => {
    e.preventDefault();
    console.log("hmmm");
  }}
  in:fade={{ duration: 100 }}
  on:keypress={() => {}}
>
  {#if hover}
    <p transition:fly={{ x: 30, duration: 150 }}>Guardar</p>
  {/if}
  <img class:hover src={starSVGSource} {width} {style} alt=">" />
</div>

<style>
  div.wrapper {
    background: white;

    border-radius: var(--btn-border-radius);

    position: absolute;
    z-index: 10;

    padding: 10px;

    right: 5px;
    bottom: 5px;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: width ease-in-out;
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
