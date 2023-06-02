<script lang="ts">
  import { Player, Video, DefaultControls, DefaultUi } from "@vime/svelte";
  import { selectedEpisode, episodesStore } from "../../store";

  $: episode = $selectedEpisode || $episodesStore[0];
  $: playerStyle = `width: 500px; margin-top: 5%`;
</script>

<Player style={playerStyle} class="player">
  <Video>
    <source data-src={episode.videoUrl} />
  </Video>

  <DefaultUi noControls>
    <DefaultControls hideOnMouseLeave activeDuration={2000} />
  </DefaultUi>
</Player>
