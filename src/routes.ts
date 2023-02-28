import EpisodeLayout from "./lib/layouts/EpisodeLayout.svelte";
import SeriesLayout from "./lib/layouts/SeriesLayout.svelte";

export const routes = {
  "/": SeriesLayout,
  "/episodio/:title": EpisodeLayout,
};
