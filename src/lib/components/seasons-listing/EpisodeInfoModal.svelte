<script lang="ts">
  import type { EpisodeType } from "../../../types/series";

  export let episode: EpisodeType;
  export let hidden = true;
</script>

<div class="modal-wrapper">
  <div class="modal-content-wrapper">
    <div class="modal-content" class:hidden>
      <h2>
        {episode.title}
      </h2>
      <p>{episode.year} • {episode.duration}</p>
      <p>{episode.description}</p>
    </div>
  </div>
</div>

<style>
  .hidden {
    display: none;
  }

  div.modal-wrapper {
    position: fixed;
    left: 0;
    z-index: 999;
    top: 0;
    overflow: auto;

    height: 100%;
    width: 100%;

    backdrop-filter: blur(3px);

    background: transparent;
  }

  div.modal-content-wrapper {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  div.modal-content {
    height: 80%;
    width: 80%;

    padding: 10px 20px;

    background-color: var(--primary-color);

    color: white;
  }

  h2 {
    font-size: 25px;
  }

  p {
    font-size: 20px;
  }
</style>
