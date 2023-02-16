import type { SeriesType, ShowcaseType } from "../types/showcase";

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
