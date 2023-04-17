<script lang="ts">
  import { searchText } from "../../store";
</script>

<input placeholder="Buscar" type="text" bind:value={$searchText} />

<style>
  input {
    appearance: none;
    border-radius: 5px;
    height: 30px;

    align-self: center;
    border: 1px solid var(--dark-background);

    margin-right: 20px;

    padding: 5px 10px;

    font-size: 18px;
  }

  input:focus,
  input:focus-visible {
    border: 3px solid var(--primary-color);
    /* border: none; */
    outline: none !important;
  }
</style>
