import type { EpisodeType, LocalUser, SeasonType, User } from "../types/series";
import { nanoid } from "nanoid";

import { read, utils } from "xlsx";
import {
  dataCollectionErrorJson,
  episodesStore,
  localeOffset,
  localUser,
  registrationErrorJson,
  seasonsStore,
  selectedEpisode,
  selectedSeason,
} from "./store";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface LoadOptions {
  sheetNames?: {
    episodes?: string;
    seasons?: string;
  };
  filename?: string;
  debug?: boolean;
}

function extractImageSrc(src: string, basePath = "/", imgPath = "preview-img") {
  if (src.startsWith("https")) {
    return src;
  }

  return `${basePath}/${imgPath}/${src}`;
}

function extractSeasons(data: any, basePath: string = "/") {
  const seasonsResult: SeasonType[] = [];

  for (let season of data) {
    const previewUrl = extractImageSrc(season.preview_img_url, basePath);

    seasonsResult.push({
      id: season.id_temporada,
      title: season.titulo,
      description: season.descripcion,
      seasonNumber: season.numero ?? 0,
      previewUrl,
    });
  }

  return seasonsResult;
}

function extractpendingRelease(pending: string) {
  if (["si", "yes", "true", "verdadero"].includes(pending.toLowerCase()))
    return true;
  else if (["no", "false", "falso"].includes(pending.toLowerCase()))
    return false;

  return true;
}

function extractEpisodes(data: any, basePath: string = "/") {
  const episodesResult: EpisodeType[] = [];

  for (let episode of data) {
    let videoUrl = String(episode.video_url);

    if (!videoUrl.startsWith("https"))
      videoUrl = `${basePath}/${episode.video_url}`;

    const previewUrl = extractImageSrc(episode.preview_img_url, basePath);
    const portraitUrl = extractImageSrc(episode.portada, basePath);

    const pendingRelease = extractpendingRelease(episode.proximamente);

    episodesResult.push({
      id: episode.id_episodio,
      title: episode.titulo_episodio,
      seasonId: episode.id_temporada,
      episodeNumber: episode.numero,
      description: episode.descripcion,
      year: +episode.año,
      duration: episode.duracion,
      videoUrl,
      previewUrl,
      portraitUrl,
      pendingRelease,
      quizzUrl: episode.quizz_url,
      releaseDate: episode.fecha_estreno,
      releaseHour: episode.hora_estreno ?? "12",
      releaseMinute: episode.minuto_estreno ?? "00",
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
  localUser: "local-user",
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

  let _localUser: LocalUser;
  localUser.subscribe((u) => {
    _localUser = u;
  });

  saveOnLocalStorage(keyNames.selectedEpisode, episode);
  saveOnLocalStorage(keyNames.selectedSeason, season);
  saveOnLocalStorage(keyNames.localUser, _localUser);
}

function deleteLocalData() {
  saveOnLocalStorage(keyNames.selectedEpisode, null);
  saveOnLocalStorage(keyNames.selectedSeason, null);
  saveOnLocalStorage(keyNames.localUser, null);
}

export async function loadSavedData() {
  const episode: EpisodeType | null = loadFromLocalStorage(
    keyNames.selectedEpisode
  );
  const season: SeasonType | null = loadFromLocalStorage(
    keyNames.selectedSeason
  );

  let firstEpisode: EpisodeType;
  episodesStore.subscribe((episodes) => {
    firstEpisode = episodes[0];
  });

  let firstSeason: SeasonType;
  seasonsStore.subscribe((seasons) => {
    firstSeason = seasons[0];
  });

  selectedEpisode.set(episode || firstEpisode);
  selectedSeason.set(season || firstSeason);

  const loadedLocalUser: LocalUser = loadFromLocalStorage(keyNames.localUser);

  localUser.set(loadedLocalUser);

  saveData();
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

async function getSiteContextDigest(): Promise<string> {
  const url: string = import.meta.env.VITE_MSD_BASE_URL;
  const basePath: string = import.meta.env.VITE_MSD_BASE_PATH;

  try {
    const contextResult = await fetch(`${url}/${basePath}/_api/contextinfo`, {
      method: "POST",
      headers: {
        Accept: "application/json;odata=verbose",
      },
    });

    console.log(contextResult);

    const contextJson = await contextResult.json();

    return contextJson.d.GetContextWebInformation.FormDigestValue;
  } catch (err) {
    console.log(JSON.stringify(err));

    return "";
  }
}

async function postJsonToList(listName: string, body: any) {
  const url: string = import.meta.env.VITE_MSD_BASE_URL;
  const basePath: string = import.meta.env.VITE_MSD_BASE_PATH;

  const bodyLength = JSON.stringify(body).length.toString();

  try {
    const contextDigest = await getSiteContextDigest();

    const res = await fetch(
      `${url}${basePath}/_api/web/lists/GetByTitle('${listName}')/items`,
      {
        method: "POST",
        headers: {
          Accept: "application/json;odata=verbose",
          "Content-Length": bodyLength,
          "X-RequestDigest": contextDigest,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    registrationErrorJson.set(null);

    const resJson = await res.json();

    console.log(resJson);
  } catch (err) {
    console.log("error registering user visit", err);

    registrationErrorJson.set(JSON.stringify(err));
  }
}

export function getDateStringWithOffset() {
  let offset: number;
  localeOffset.subscribe((o) => {
    offset = o;
  });

  return dayjs()
    .tz("America/Mexico_City")
    .subtract(offset, "hours")
    .toISOString();
}

type ButtonType = "mas_info" | "quizz";

export async function registerEpisiodeButtonClickByUser(
  episode: EpisodeType,
  buttonType: ButtonType,
  user?: User
) {
  const buttonClickedListName = import.meta.env
    .VITE_MSD_SP_VIDEO_BUTTON_CLICK_LIST_TITLE;

  const userInfo = user || (await getCurrentUser());

  const dateString = getDateStringWithOffset();

  const body = {
    Title: nanoid(),
    Correo: userInfo.email,
    IdTemporada: episode.seasonId,
    IdEpisodio: episode.id,
    TituloEpisodio: episode.title,
    TipoBoton: buttonType.toLocaleUpperCase(),
    Momento: dateString,
  };

  await postJsonToList(buttonClickedListName, body);
}

export async function registerEpisodeVisitedByUser(
  episode: EpisodeType,
  user?: User
) {
  const visitedEpisodeListName = import.meta.env
    .VITE_MSD_SP_VIDEO_CLICKED_LIST_TITLE;

  const userInfo = user || (await getCurrentUser());

  const dateString = getDateStringWithOffset();

  const body = {
    Title: nanoid(),
    Correo: userInfo.email,
    IdTemporada: episode.seasonId,
    IdEpisodio: episode.id,
    TituloEpisodio: episode.title,
    Momento: dateString,
  };

  await postJsonToList(visitedEpisodeListName, body);
}

export async function registerUserVisit(user?: User) {
  const visitListTitle = import.meta.env.VITE_MSD_SP_VISITS_LIST_TITLE;

  const userInfo = user || (await getCurrentUser());

  const dateString = getDateStringWithOffset();

  const body = {
    Title: nanoid(),
    Correo: userInfo.email,
    Nombre: userInfo.name,
    OData__x00da_ltimavisita: dateString,
    Departamento: userInfo.department,
  };

  await postJsonToList(visitListTitle, body);
}

function getElementsFromArray(arr: any[], fields: string[]) {
  let resultObject: Record<string, string> = {};

  for (let element of arr) {
    if (!fields.includes(element.Key)) continue;

    resultObject[element.Key] = element.Value;
  }

  return resultObject;
}

async function _getCompanyUser(): Promise<User | null> {
  try {
    const url: string = import.meta.env.VITE_MSD_BASE_URL;
    const res = await fetch(
      `${url}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`,
      {
        headers: {
          Accept: "application/json;odata=verbose",
        },
      }
    );

    const resJson = await res.json();

    const keys = [
      "PreferredName",
      "WorkEmail",
      "UserProfile_GUID",
      "Department",
    ];
    const values = getElementsFromArray(
      resJson.d.UserProfileProperties.results,
      keys
    );

    const email = values.WorkEmail;
    const id = values.UserProfile_GUID;
    const nameId = values.UserProfile_GUID;
    const name = values.PreferredName;
    const department = values.Department;

    dataCollectionErrorJson.set(null);

    return {
      email,
      id,
      nameId,
      name,
      department,
    };
  } catch (err) {
    console.log(`get user info error: ${err}`);

    dataCollectionErrorJson.set(JSON.stringify(err));

    return defaultUser;
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
  department: "",
};

const MSD_VERSION_KEY = "msd-version";

export function verifyInstalledVersion() {
  const savedVersion = loadFromLocalStorage(MSD_VERSION_KEY);
  const servedVersion = import.meta.env.VITE_MSD_VERSION;

  console.log(
    `served version: ${servedVersion} | saved version: ${savedVersion}`
  );

  if (!savedVersion || savedVersion === "undefined") {
    saveOnLocalStorage(MSD_VERSION_KEY, servedVersion);
  } else if (savedVersion !== servedVersion) {
    saveOnLocalStorage(MSD_VERSION_KEY, servedVersion);

    deleteLocalData();

    window.location.reload();
  }
}

export function isUserAgentSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

export function getDate(date: string, hour: string, minute: string) {
  console.log("determinig user agent");

  const isSafari = isUserAgentSafari();
  // let isSafari =
  //   navigator.vendor.match(/apple/i) &&
  //   !navigator.userAgent.match(/crios/i) &&
  //   !navigator.userAgent.match(/fxios/i) &&
  //   !navigator.userAgent.match(/Opera|OPT\//);

  console.log("is safari", isSafari);

  if (isSafari) {
    date = date.replaceAll("/", "-");

    let d = new Date(date);

    console.log("date", d);

    let result = dayjs(d).tz("America/Mexico_City");

    result.set("hours", +hour);
    result.set("minutes", +minute);

    return result;
  } else {
    return dayjs(`${date} ${hour}:${minute}`, "d/MMM/Y h:m").tz(
      "America/Mexico_City"
    );
  }
}

export function getDateFormat(date: Dayjs) {
  const isSafari = isUserAgentSafari();

  if (isSafari) {
    return date.format("DD-MMM-YYYY hh:mm A");
  } else {
    return date.format("DD/MMM/YYYY hh:mm A");
  }
}

function delay(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function searchSeasonByEpisode(episode: EpisodeType) {
  let seasons: SeasonType[];

  seasonsStore.subscribe((s) => {
    seasons = s;
  });

  for (let season of seasons) {
    if (season.id == episode.seasonId) return season;
  }

  return null;
}

export function isLastEpisiode(episode: EpisodeType) {
  let episodesInSeason: EpisodeType[];

  episodesStore.subscribe((eps) => {
    episodesInSeason = eps.filter((ep) => ep.seasonId == episode.seasonId);
  });

  const lastEpisode = episodesInSeason[episodesInSeason.length - 1];

  if (!lastEpisode) return false;

  return lastEpisode.id === episode.id;
}
