import manifest from "../src/manifest.json";
import { writeFile } from "fs/promises";

export async function bump(type: `patch` | `minor` | `major` = `patch`) {
  const current = manifest.version.split(`.`);
  let bumped = ``;

  switch (type) {
    case `patch`:
      bumped = `${current[0]}.${current[1]}.${parseInt(current[2]) + 1}`;
      break;
    case `minor`:
      bumped = `${current[0]}.${parseInt(current[1]) + 1}.0`;
      break;
    case `major`:
      bumped = `${parseInt(current[0]) + 1}.0.0`;
      break;
  }
  manifest.version = bumped;

  try {
    await writeFile(`./src/manifest.json`, JSON.stringify(manifest, null, 2));
    console.log(`Bumped to ${bumped}`);
  } catch (error) {
    console.log(`Unable to bump error`, error);
  }
}
