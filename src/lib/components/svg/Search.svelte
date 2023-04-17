<script>
  import { createEventDispatcher } from "svelte";
  import SearchSVG from "../../../assets/magnifying-glass-solid.svg";

  const dispatch = createEventDispatcher();

  export let width = 20;

  function handleClick() {
    return () => {
      dispatch("click");
    };
  }
</script>

<img
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
    top: 25%;
  }
</style>
