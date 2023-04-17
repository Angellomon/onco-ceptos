<script>
  import SeasonSelectOptions from "./SeasonSelectOptions.svelte";

  let isSelected = false;
</script>

<select name="optionSelect" id="option-select">
  <SeasonSelectOptions />
</select>

<style>
  select {
    appearance: none;

    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: 20px;
    cursor: inherit;
    line-height: inherit;
  }
</style>
