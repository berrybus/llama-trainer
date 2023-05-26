// @ts-nocheck
import fs from "fs";
import { glob } from "glob";
import type { MatchDay, MatchDayListing } from "@/app/page";

// Define the file path and format constants
const folderPath = "public/data";
const formatExtension = ".json";

// Define the parsing and transformation functions
function parseToKnownFormat(fileContent: string): MatchDay {
  return JSON.parse(fileContent);
}

function transformToNewFormat(matchDay: MatchDay): MatchDayListing {
  return {
    date: matchDay.date,
    league: matchDay.league,
    day: matchDay.day,
    questions: [
      matchDay[1],
      matchDay[2],
      matchDay[3],
      matchDay[4],
      matchDay[5],
      matchDay[6],
    ],
  };
}

function writeBack(filePath: string, newFormat: MatchDayListing) {
  const content = JSON.stringify(newFormat, null, 4);
  fs.writeFileSync(filePath, content);
}

// Find all files with the known format in the folder
const files = glob.sync(`${folderPath}/*${formatExtension}`);
console.log(files);
console.log(`${folderPath}/*.${formatExtension}`);
// Iterate over each file
files.forEach((file: string) => {
  console.log(file);
  // Read the file content
  const fileContent = fs.readFileSync(file, "utf8");

  // Parse the content into the known format
  const knownFormat = parseToKnownFormat(fileContent);

  // Transform the known format into the new format
  const newFormat = transformToNewFormat(knownFormat);

  // Write the new format back to the file
  writeBack(file, newFormat);
});
