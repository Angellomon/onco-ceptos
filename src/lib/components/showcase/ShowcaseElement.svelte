<script lang="ts">
  import type { ShowcaseType } from "../../../types/series";

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

    transform: var(--showcase-skew-opposite);
    transition: transform 0.3s;
    z-index: 0;

    padding: 10px;
  }

  div:nth-child(odd) {
    background-color: var(--secondary-color);
  }

  div:hover {
    cursor: pointer;
    transform: scale(1.1) var(--showcase-skew-opposite);
    z-index: 10;

    -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  }

  div:hover > h1 p {
    transform: var(--showcase-skew);
  }

  h2 {
    align-self: flex-start;

    margin-top: 10px;

    transform: var(--showcase-skew);

    text-align: right;
    text-decoration: underline;
  }

  p {
    align-self: flex-end;

    margin-bottom: 20px;

    transform: var(--showcase-skew);
  }
</style>
