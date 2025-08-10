import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsFolder = path.join(__dirname, "../src/lib/lucide");
const iconsJsonPath = path.join(__dirname, "../src/lib/icons.json");

function ensureDirectoryExistence(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// function updateFillToCurrentColor(svgContent) {
//   return svgContent.replace(/fill=".*?"/g, 'fill="currentColor"');
// }

function generateIconsJson(assetsFolder, iconsJsonPath) {
  if (!fs.existsSync(assetsFolder)) {
    console.error(`Pasta ${assetsFolder} não encontrada!`);
    return;
  }

  const svgFiles = fs
    .readdirSync(assetsFolder)
    .filter((file) => path.extname(file) === ".svg");
  const svgsObject = {};

  svgFiles.forEach((file) => {
    const filePath = path.join(assetsFolder, file);
    let svgContent = fs.readFileSync(filePath, "utf-8");

    // svgContent = updateFillToCurrentColor(svgContent);

    const fileName = path.basename(file, ".svg");
    svgsObject[fileName] = svgContent;
  });

  ensureDirectoryExistence(iconsJsonPath);

  let existingData = {};
  if (fs.existsSync(iconsJsonPath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(iconsJsonPath, "utf-8"));
    } catch (err) {
      console.warn("Falha ao ler icons.json existente. Sobrescrevendo.");
    }
  }

  const updatedData = { ...existingData, ...svgsObject };

  fs.writeFileSync(
    iconsJsonPath,
    JSON.stringify(updatedData, null, 2),
    "utf-8"
  );
  console.log(`icons.json atualizado com sucesso em ${iconsJsonPath}`);
}

generateIconsJson(assetsFolder, iconsJsonPath);
