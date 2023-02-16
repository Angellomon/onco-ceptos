<script lang="ts">
  import type { ShowcaseType } from "../../types/showcase";

  export let showcase: ShowcaseType;
</script>

<div>
  <h2>
    {showcase.title}
  </h2>
  <p>{showcase.description || ""}</p>
</div>

<style>
  div {
    background-color: var(--primary-color);

    min-width: 30px;
    min-height: 60px;

    width: 15vw;
    height: 30vw;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    transform: skew(-20deg);

    padding: 10px;
  }

  div:nth-child(odd) {
    background-color: var(--secondary-color);
  }

  h2 {
    align-self: flex-start;
    margin-top: 10px;
    transform: skew(20deg);
    text-align: left;
  }

  p {
    align-self: flex-end;
    margin-bottom: 20px;
    transform: skew(20deg);
  }
</style>
