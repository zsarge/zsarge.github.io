import * as fs from "fs";
import path, { dirname } from "path";
import { capitalize } from "../../../lib/util";

/**
 * File reads occur relative to project root
 */
const BASE_DIR = "./src/assets/cat-feeder/animals";

function getAnimals(): string[] {
  return fs.readdirSync(BASE_DIR);
}

function getPaths(animalName: string): string[] {
  const pathName = path.join(BASE_DIR, animalName);
  return fs.readdirSync(pathName);
}

function PictureOf(fileName: string): JSX.Element {
  return <li key={fileName}>fileName: {fileName}</li>;
}

export default function CatPictures() {
  return (
    <>
      {getAnimals().map((animal) => (
        <>
          Animal {capitalize(animal)}
          <ul>{getPaths(animal).map(PictureOf)}</ul>
        </>
      ))}
      <br />
    </>
  );
}
