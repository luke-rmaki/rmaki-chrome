import * as fs from "fs";
import { pack } from "./lib/pack";
import { bump } from "./lib/bump";

function main() {
  const destination = `./rmaki.zip`;

  bump();
  // Check if the zip file exists and delete it
  if (fs.existsSync(destination)) {
    fs.unlinkSync(destination);
  }

  pack({
    source: `./src`,
    destination: destination,
  });
}

main();
