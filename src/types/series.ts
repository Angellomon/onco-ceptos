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
  videoUrl: string;
  previewUrl?: string;
  year: number;
  duration: number;
};

export type ShowcaseType = {
  title: string;
  description?: string;
  previewUrl?: string;
};

export type SeasonType = {
  id: string;
  title: string;
  description: string;
  previewUrl: string;
};
