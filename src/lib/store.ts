import { writable } from "svelte/store";
import type { EpisodeType, SeasonType } from "../types/series";

export const episodesStore = writable<EpisodeType[]>([]);

export const seasonsStore = writable<SeasonType[]>([]);

export const selectedSeason = writable<SeasonType | null>(null);

export const selectedEpisode = writable<EpisodeType | null>(null);

export const episodeAlreadyClicked = writable(false);

export const dataIsLoading = writable(false);

export const searchText = writable<string | null>(null);
