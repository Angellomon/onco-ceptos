import { writable } from "svelte/store";
import type { EpisodeType, SeriesType, ShowcaseType } from "../types/series";

export const showcaseStore = writable<ShowcaseType[]>([]);

export const seriesStore = writable<SeriesType[]>([]);

export const episodesStore = writable<EpisodeType[]>([]);

export const selectedSeries = writable<SeriesType | null>(null);
