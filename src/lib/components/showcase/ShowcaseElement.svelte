<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import type { ShowcaseType } from "../../../types/series";
  import { selectedSeries } from "../../store";

  export let showcase: ShowcaseType;

  let divElement: HTMLElement;

  onMount(() => {
    divElement.addEventListener("click", (e) => {
      e.preventDefault();

      document
        .getElementById("series-title")
        .scrollIntoView({ behavior: "smooth", block: "center" });
    });

    divElement.style.setProperty(
      "--background",
      `url("/preview-img/${showcase.previewUrl}")`
    );
  });

  onDestroy(() => {
    divElement.removeEventListener("click", () => {});
  });

  function handleSeriesClick() {
    selectedSeries.set(showcase);
  }
</script>

<div bind:this={divElement} on:click={handleSeriesClick} on:keydown={() => {}}>
  <h2>
    {showcase.title}
  </h2>
  <p>{showcase.description || ""}</p>
</div>

<style>
  div {
    /* background-color: var(--primary-color); */

    min-width: 300px;
    min-height: 60px;

    width: 15vw;
    height: 40vh;

    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    transform: var(--showcase-skew-opposite);
    transition: transform 0.3s;
    z-index: 0;

    padding: 10px;
  }

  div:nth-child(odd)::after {
    background-image: linear-gradient(var(--secondary-color), transparent);
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

  div::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      180deg,
      var(--primary-color),
      transparent
    );
  }

  div::before {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: var(--background);
  }

  h2 {
    align-self: flex-start;

    transform: var(--showcase-skew);

    text-align: right;
    text-decoration: underline;

    position: absolute;
    z-index: 10;
    top: 5px;
    right: 20px;

    font-size: 35px;
  }

  p {
    align-self: flex-end;

    max-width: 230px;

    transform: var(--showcase-skew);

    position: absolute;
    z-index: 10;
    bottom: 10px;
    right: 20px;

    font-size: 20px;

    text-align: right;

    background-color: rgba(255, 255, 255, 0.7);
    padding: 5px 10px;

    border-radius: 5px;
  }
</style>
