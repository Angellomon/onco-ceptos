<script>
  import Router from "svelte-spa-router";

  import { routes } from "../../routes";
</script>

<main>
  <Router {routes} />
</main>

<style>
  main {
    min-width: 100vw;
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
