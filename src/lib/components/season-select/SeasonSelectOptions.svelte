<script lang="ts">
  import { flip } from "svelte/animate";
  import { seasonsStore } from "../../store";
</script>

<option value="" disabled selected>Temporadas</option>
{#each $seasonsStore as season (season.id)}
  <option value={season.id} animate:flip>{season.title}</option>
{/each}

<style>
  option {
    background-color: tomato !important;
  }
</style>
