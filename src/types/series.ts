export type EpisodeType = {
  id: string;
  title: string;
  seasonId: string;
  episodeNumber: number;
  description?: string;
  videoUrl: string;
  previewUrl?: string;
  year: number;
  duration: number;
  portraitUrl: string;
};

export type SeasonType = {
  id: string;
  title: string;
  description: string;
  previewUrl: string;
};
