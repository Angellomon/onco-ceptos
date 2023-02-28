import type { EpisodeType, SeriesType, ShowcaseType } from "../types/series";

import { read, utils } from "xlsx";

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
    series?: string;
    episodes?: string;
    showcase?: string;
  };
  filename?: string;
  debug?: boolean;
}

function extractSeries(data: any): SeriesType[] {
  const seriesResult: SeriesType[] = [];

  for (let series of data) {
    seriesResult.push({
      title: series.titulo,
      description: series.descripcion_completa,
      shortDescription: series.descripcion_corta,
    });
  }

  return seriesResult;
}

function extractEpisodes(data: any) {
  const episodesResult: EpisodeType[] = [];

  for (let episode of data) {
    episodesResult.push({
      title: episode.titulo_episodio,
      seriesTitle: episode.titulo_serie,
      episodeNumber: episode.numero,
      description: episode.descripcion,
      videoUrl: episode.url,
      previewUrl: episode.preview_img_url,
    });
  }

  console.log(episodesResult);

  return episodesResult;
}

function extractShowcase(data: any) {
  const showcaseResult: ShowcaseType[] = [];

  for (let showcase of data) {
    showcaseResult.push({
      title: showcase.titulo_serie,
      description: showcase.descripcion,
      previewUrl: showcase.preview_img_url,
    });
  }

  return showcaseResult;
}

export async function loadSeriesData(
  options: LoadOptions = {
    sheetNames: {
      series: "series",
      episodes: "episodios",
      showcase: "showcase",
    },
    filename: "/datos-onconceptos.xlsx",
    debug: false,
  }
) {
  const file = await (await fetch(options.filename)).arrayBuffer();
  const wb = read(file);

  const seriesWB = wb.Sheets[options.sheetNames.series];
  const seriesJson = utils.sheet_to_json(seriesWB);
  const series = extractSeries(seriesJson);

  const episodesWB = wb.Sheets[options.sheetNames.episodes];
  const episodesJson = utils.sheet_to_json(episodesWB);
  const episodes = extractEpisodes(episodesJson);

  const showcaseWB = wb.Sheets[options.sheetNames.showcase];
  const showcaseJson = utils.sheet_to_json(showcaseWB);
  const showcase = extractShowcase(showcaseJson);

  const data = {
    series,
    episodes,
    showcase,
  };

  if (options.debug) console.log(data);

  return data;
}
