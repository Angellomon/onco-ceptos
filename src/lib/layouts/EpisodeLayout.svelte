<script lang="ts">
  import EpisodesListingSidebar from "../components/listing/EpisodesListingSidebar.svelte";
  import { selectedEpisode } from "../store";
</script>

<section>
  <h1>EPISODIOS</h1>

  <div class="content">
    <EpisodesListingSidebar />
  </div>
</section>

<style>
  h1 {
    color: var(--light-background);
    margin: 0 4%;
    background-color: var(--primary-color);
  }

  section {
    background-color: var(--primary-color);

    padding: 2% 1%;
    margin: 0;

    min-height: 70vh;

    position: relative;
  }

  div.content {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-around;

    width: 100%;
    height: 100%;
    padding: 2% 1%;
  }
</style>
