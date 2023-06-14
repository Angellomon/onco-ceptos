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
  pendingRelease: boolean;
  quizzUrl: string;
  releaseDate: string;
  releaseHour: string;
  releaseMinute: string;
};

export type SeasonType = {
  id: string;
  title: string;
  description: string;
  previewUrl: string;
  seasonNumber: number;
};

export type User = {
  id: string;
  email: string;
  nameId: string;
  name: string;
  department: string;
};

export type LocalUser = User | null;
