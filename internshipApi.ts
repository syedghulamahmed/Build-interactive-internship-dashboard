import type { Internship } from "../types/internship";

const DATA_URL = "/mock-data.json";
const MIN_DELAY_MS = 700;
const ERROR_PROBABILITY = 0.12;

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

export async function fetchInternships(): Promise<Internship[]> {
  await wait(MIN_DELAY_MS);

  if (Math.random() < ERROR_PROBABILITY) {
    throw new Error("Simulated network error. Please try again.");
  }

  const response = await fetch(DATA_URL);

  if (!response.ok) {
    throw new Error(`Unable to load internships (${response.status}).`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("The internship dataset has an invalid format.");
  }

  return data as Internship[];
}
