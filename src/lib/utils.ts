import type { EpisodeType, SeasonType, User } from "../types/series";

import { read, utils } from "xlsx";
import { selectedEpisode, selectedSeason } from "./store";
import { text } from "svelte/internal";

interface LoadOptions {
  sheetNames?: {
    episodes?: string;
    seasons?: string;
  };
  filename?: string;
  debug?: boolean;
}

function extractSeasons(data: any, basePath: string = "/") {
  const seasonsResult: SeasonType[] = [];

  for (let season of data) {
    seasonsResult.push({
      id: season.id_temporada,
      title: season.titulo,
      description: season.descripcion,
      previewUrl: `${basePath}/preview-img/${season.preview_img_url}`,
    });
  }

  return seasonsResult;
}

function extractEpisodes(data: any, basePath: string = "/") {
  const episodesResult: EpisodeType[] = [];
  console.log(basePath);

  for (let episode of data) {
    let videoUrl = String(episode.video_url);

    if (!videoUrl.startsWith("https"))
      videoUrl = `${basePath}/${episode.video_url}`;

    episodesResult.push({
      id: episode.id_episodio,
      title: episode.titulo_episodio,
      seasonId: episode.id_temporada,
      episodeNumber: episode.numero,
      description: episode.descripcion,
      videoUrl,
      previewUrl: `${basePath}/preview-img/${episode.preview_img_url}`,
      year: +episode.año,
      duration: episode.duracion,
      portraitUrl: `${basePath}/preview-img/${episode.portada}`,
    });
  }

  return episodesResult;
}

export async function loadSeriesData(
  options: LoadOptions = {
    sheetNames: {
      episodes: "episodios",
      seasons: "temporadas",
    },
    filename: "datos-onconceptos.xlsx",
  }
) {
  let basePath;

  if (import.meta.env.BASE_URL == "/" && import.meta.env.DEV)
    basePath = "http://localhost:3000";
  else basePath = import.meta.env.BASE_URL;

  const file = await (
    await fetch(`${basePath}/${options.filename}`)
  ).arrayBuffer();
  const wb = read(file);

  const seasonsWB = wb.Sheets[options.sheetNames.seasons];
  const seasonsJson = utils.sheet_to_json(seasonsWB);
  const seasons = extractSeasons(seasonsJson, basePath);

  const episodesWB = wb.Sheets[options.sheetNames.episodes];
  const episodesJson = utils.sheet_to_json(episodesWB);
  const episodes = extractEpisodes(episodesJson, basePath);

  const data = {
    episodes,
    seasons,
  };

  return data;
}

const keyNames = {
  selectedEpisode: "selected-episode",
  selectedSeason: "selected-season",
};

function saveOnLocalStorage(key: string, object: any) {
  localStorage.setItem(key, JSON.stringify(object));
}

function loadFromLocalStorage(key: string) {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : null;
}

export async function saveData() {
  let season: SeasonType | null;
  selectedSeason.subscribe((s) => {
    season = s;
  });

  let episode: EpisodeType | null;
  selectedEpisode.subscribe((e) => {
    episode = e;
  });

  saveOnLocalStorage(keyNames.selectedEpisode, episode);
  saveOnLocalStorage(keyNames.selectedSeason, season);
}

export async function loadSavedData() {
  const episode: EpisodeType | null = loadFromLocalStorage(
    keyNames.selectedEpisode
  );
  const season: SeasonType | null = loadFromLocalStorage(
    keyNames.selectedSeason
  );

  selectedEpisode.set(episode);
  selectedSeason.set(season);
}

function extractValueFromString(inputString: string, startTag: string, endTag) {
  const startIndex = inputString.indexOf(startTag);
  const endIndex = inputString.indexOf(endTag);

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    return null; // No valid email found
  }

  const email = inputString.substring(startIndex + startTag.length, endIndex);
  return email;
}

async function _getCompanyUser(): Promise<User | null> {
  try {
    const url: string = import.meta.env.VITE_MSD_BASE_URL;
    const res = await fetch(`${url}/_api/web/currentUser`);

    const text = await res.text();

    const email = extractValueFromString(text, "<d:Email>", "</d:Email>");
    const id = extractValueFromString(
      text,
      '<d:Id m:type="Edm.Int32">',
      "</d:Id>"
    );
    const nameId = extractValueFromString(text, "<d:NameId>", "</d:NameId>");
    const name = extractValueFromString(text, "<d:Title>", "</d:Title>");

    return {
      email,
      id,
      nameId,
      name,
    };
  } catch (err) {
    return null;
  }
}

export async function getCurrentUser() {
  const isDev = import.meta.env.DEV;

  if (isDev) return defaultUser;

  return await _getCompanyUser();
}

export const defaultUser: User = {
  email: "someone@somewhere.com",
  id: "000000",
  nameId: "0000000000000000",
  name: "Test",
};
