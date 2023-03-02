<script lang="ts">
  import VideoPlayer from "svelte-video-player";
  import { fly } from "svelte/transition";

  import { selectedEpisode } from "../store";

  export let delay = 400;
</script>

<div
  class="episode-description"
  in:fly={{
    opacity: 1,
    x: 500,
    duration: 300,
    delay,
  }}
  out:fly={{
    opacity: 1,
    x: 500,
    duration: 300,
  }}
>
  {#if $selectedEpisode}
    <h2>{$selectedEpisode.title}</h2>
    <p>{$selectedEpisode.description}</p>

    <div class="episode-video">
      <VideoPlayer
        poster={`/preview-img/${$selectedEpisode.previewUrl}`}
        source={$selectedEpisode.videoUrl}
        color="#70c1b3"
        bufferedColor="#ffe066"
      />
    </div>
  {:else}
    <h3>No encontrado :(</h3>
  {/if}
</div>

<style>
  h2,
  h3 {
    text-align: right;
    font-size: 40px;
  }

  p {
    text-align: right;
    font-size: 22px;
  }

  div.episode-description {
    background-color: #c2e5df;
    /* margin-top: -4vh; */
    margin-right: 5vw;
    margin-left: 3vw;
    padding-right: 3vw;
    padding-left: 3vw;
    padding-bottom: 2vw;
    padding-top: 2vw;

    width: 100%;
    height: 100%;
  }

  div.episode-video {
    width: 100%;
    left: 3vw;
  }
</style>
