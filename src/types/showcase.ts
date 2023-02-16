export type SeriesType = {
  title: string; // * also works as ID
  description?: string;
  shortDescription?: string;
};

export type EpisodeType = {
  title: string;
  seriesTitle: string;
  episodeNumber: number;
  description?: string;
  url: string;
};

export type ShowcaseType = {
  title: string;
  previewUrl?: string;
  description?: string;
};
