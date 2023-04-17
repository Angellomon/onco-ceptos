<script>
  import { createEventDispatcher } from "svelte";
  import SearchSVG from "../../../assets/lupa.svg";
  // import SearchSVG from "../../../assets/magnifying-glass-solid.svg";

  const dispatch = createEventDispatcher();

  export let width = 18;
  export let hover = false;

  function handleClick() {
    return () => {
      dispatch("click");
    };
  }
</script>

<img
  class:hover
  src={SearchSVG}
  {width}
  alt="/"
  on:click={handleClick()}
  on:keypress={() => {}}
/>

<style>
  img {
    position: absolute;
    left: 15px;
    top: 30%;

    cursor: pointer;

    transition: all 0.2s ease-in-out;
  }

  img.hover {
    transform: scale(1.3);
  }
</style>
