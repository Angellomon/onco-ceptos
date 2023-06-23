import { readable, writable } from "svelte/store";
import type { EpisodeType, LocalUser, SeasonType, User } from "../types/series";

export const episodesStore = writable<EpisodeType[]>([]);

export const seasonsStore = writable<SeasonType[]>([]);

export const selectedSeason = writable<SeasonType | null>(null);

export const selectedEpisode = writable<EpisodeType | null>(null);

export const episodeAlreadyClicked = writable(false);

export const dataIsLoading = writable(false);

export const searchText = writable<string | null>(null);

export const selectedEpisodeInfo = writable<EpisodeType | null>(null);

export const currentUser = writable<User>();

let bodyWidth;

bodyWidth = document.body.clientWidth;

export const TABLET_MAX_WIDTH = 1024;
export const MOBILE_MAX_WIDTH = 500;

export const isTablet = writable(
  bodyWidth < TABLET_MAX_WIDTH && bodyWidth > MOBILE_MAX_WIDTH
);
export const isMobile = writable(bodyWidth <= MOBILE_MAX_WIDTH);

window.addEventListener("resize", (e: any) => {
  bodyWidth = e.target.document.body.clientWidth;

  isTablet.set(bodyWidth < TABLET_MAX_WIDTH && bodyWidth > MOBILE_MAX_WIDTH);
  isMobile.set(bodyWidth <= MOBILE_MAX_WIDTH);
});

export const isMenuOpen = writable(false);

export const registrationErrorJson = writable<string | null>(null);

export const dataCollectionErrorJson = writable<string | null>(null);

export const localUser = writable<LocalUser>(null);

export const localeOffset = readable(2);
