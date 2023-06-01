<script lang="ts">
  import { selectedEpisode } from "../../store";
  export let width = 569;
  export let height = 320;

  $: src = $selectedEpisode.videoUrl;
  $: title = $selectedEpisode.title;
</script>

<iframe {title} {width} {height} {src} allowfullscreen />

<style>
  iframe {
    border: none;
    margin-top: 30px;
  }
</style>
