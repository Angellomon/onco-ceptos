<script lang="ts">
  import { isMobile, selectedEpisode } from "../../store";

  const DEFAULT_WIDTH = 600;
  const DEFAULT_HEIGHT = 350;

  const MOBILE_WIDTH = 380;
  const MOBILE_HEIGHT = 200;

  $: src = $selectedEpisode.videoUrl;
  $: title = $selectedEpisode.title;
  $: width = $isMobile ? MOBILE_WIDTH : DEFAULT_WIDTH;
  $: height = $isMobile ? MOBILE_HEIGHT : DEFAULT_HEIGHT;
</script>

<iframe {title} {width} {height} {src} allowfullscreen />

<style>
  iframe {
    border: none;
  }
</style>
