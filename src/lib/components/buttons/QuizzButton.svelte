<script lang="ts">
  import Interrogation from "../svg/Interrogation.svelte";

  import { selectedEpisode } from "../../store";

  let hover = false;

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

<a href={$selectedEpisode.quizzUrl} target="_blank" rel="noreferrer">
  <button
    on:mouseover={handleMouseOver()}
    on:mouseleave={handleMouseLeave()}
    on:focus={() => {}}
    class="quizz"
  >
    <Interrogation {hover} /> Quizz</button
  >
</a>

<style>
  button {
    cursor: pointer;

    background-color: white;
    border-radius: var(--btn-border-radius);
    border: none;

    padding: 10px 20px;
    width: 100%;

    font-size: 22px;

    padding-left: 45px;

    /* border-radius: 20px; */
    position: relative;
  }

  button.quizz {
    border: 2px solid white;
    border-radius: var(--btn-border-radius);

    padding: 5px 20px;
    padding-left: 40px;

    height: 50px;

    position: relative;

    background: var(--secondary-color);
    color: white;

    font-size: 18px;

    cursor: pointer;
  }
</style>
