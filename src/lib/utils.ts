import type {
  EpisodeType,
  SeasonType,
  SeriesType,
  ShowcaseType,
} from "../types/series";

import { read, utils } from "xlsx";
import { selectedEpisode, selectedSeason } from "./store";

type GenerateTestDataOptions = {
  limit?: number;
  allowUndefinedDescriptions?: boolean;
};

export function generateTestData(
  options: GenerateTestDataOptions = {
    limit: 10,
    allowUndefinedDescriptions: false,
  }
) {
  const data: ShowcaseType[] = [];

  for (let i = 1; i <= options.limit; i += 1)
    data.push({
      title: `Test ${i}`,
      description: options.allowUndefinedDescriptions
        ? undefined
        : `Descripción Test ${i} a, Descripción Test ${i} b,  Descripción Test ${i} c, Descripción Test ${i}`,
    });

  return data;
}

export function generateSeriesTestData(
  options: GenerateTestDataOptions = {
    limit: 10,
    allowUndefinedDescriptions: false,
  }
) {
  const data: SeriesType[] = [];

  for (let i = 1; i <= options.limit; i += 1)
    data.push({
      title: `Serie Test ${i}`,
      description: options.allowUndefinedDescriptions
        ? undefined
        : `Descripcion Serie Test ${i}`,
      shortDescription: `Una Serie Test (${i})`,
    });

  return data;
}

interface LoadOptions {
  sheetNames?: {
    episodes?: string;
    seasons?: string;
  };
  filename?: string;
  debug?: boolean;
}

function extractSeasons(data: any) {
  const seasonsResult: SeasonType[] = [];

  for (let season of data) {
    seasonsResult.push({
      id: season.id_temporada,
      title: season.titulo,
      description: season.descripcion,
      previewUrl: season.preview_img_url,
    });
  }

  return seasonsResult;
}

function extractEpisodes(data: any) {
  const episodesResult: EpisodeType[] = [];

  for (let episode of data) {
    episodesResult.push({
      title: episode.titulo_episodio,
      seriesTitle: episode.titulo_serie,
      episodeNumber: episode.numero,
      description: episode.descripcion,
      videoUrl: episode.video_url,
      previewUrl: episode.preview_img_url,
      year: +episode.año,
      duration: episode.duracion,
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
    filename: "/datos-onconceptos.xlsx",
  }
) {
  const file = await (await fetch(options.filename)).arrayBuffer();
  const wb = read(file);

  const seasonsWB = wb.Sheets[options.sheetNames.seasons];
  const seasonsJson = utils.sheet_to_json(seasonsWB);
  const seasons = extractSeasons(seasonsJson);

  const episodesWB = wb.Sheets[options.sheetNames.episodes];
  const episodesJson = utils.sheet_to_json(episodesWB);
  const episodes = extractEpisodes(episodesJson);

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
