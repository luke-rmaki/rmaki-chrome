import JSZip from "jszip";
import * as fs from "fs";
import * as path from "path";

export async function pack({ source, destination }) {
  const zip = new JSZip();

  // Read directory and add files to zip
  fs.readdirSync(source).forEach((file) => {
    const file_path = path.join(source, file);
    const file_data = fs.readFileSync(file_path);
    zip.file(file, file_data);
  });

  // Generate zip file
  const content = await zip.generateAsync({ type: `nodebuffer` });

  // Write zip file to destination
  fs.writeFileSync(destination, content);
}
