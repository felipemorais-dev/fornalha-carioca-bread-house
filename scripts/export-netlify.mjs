// Gera uma pasta estática publicável no Netlify: `bun run export:netlify`.
//
// O build normal do projeto continua o mesmo. Aqui a flag NETLIFY_STATIC_EXPORT
// faz o vite.config.ts construir um servidor Node que só serve para renderizar a
// página uma vez: o HTML resultante, os estilos, os scripts e as fotografias
// viram uma pasta autossuficiente, sem dependência de servidor.

import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = process.env.NETLIFY_OUT ?? "/tmp/netlify-export/site";
const DEV_SERVER = process.env.DEV_SERVER_URL ?? "http://localhost:8080";
const CDN_PREFIX = "/__l5e/assets-v1/";
const LOCAL_PREFIX = "/fotos/";
const TEXT_EXT = new Set([
  ".html",
  ".js",
  ".css",
  ".json",
  ".txt",
  ".svg",
  ".xml",
  ".webmanifest",
]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 1. Build com o alvo Node (fora do modo Lovable, que pinça Cloudflare).
const build = spawnSync("bun", ["run", "build"], {
  cwd: ROOT,
  stdio: "inherit",
  env: {
    ...process.env,
    NETLIFY_STATIC_EXPORT: "1",
    LOVABLE_SANDBOX: "",
    DEV_SERVER__PROJECT_PATH: "",
  },
});
if (build.status !== 0) {
  console.error("O build falhou.");
  process.exit(build.status ?? 1);
}

const publicDir = path.join(ROOT, ".output/public");
const serverEntry = path.join(ROOT, ".output/server/index.mjs");
if (!existsSync(publicDir) || !existsSync(serverEntry)) {
  console.error("Faltam .output/public ou .output/server/index.mjs no build.");
  process.exit(1);
}

// 2. Renderizar a página com o servidor que acabou de ser construído.
const port = 41000 + Math.floor(Math.random() * 9000);
const server = spawn("node", [serverEntry], {
  cwd: ROOT,
  env: { ...process.env, PORT: String(port), HOST: "127.0.0.1" },
  stdio: "ignore",
});

let html = "";
try {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    await sleep(250);
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      if (response.ok) {
        html = await response.text();
        break;
      }
    } catch {
      // o servidor ainda está subindo
    }
  }
} finally {
  server.kill("SIGTERM");
}

if (!html) {
  console.error("O servidor gerado não respondeu a tempo.");
  process.exit(1);
}

// 3. Montar a pasta de saída.
await rm(OUT_DIR, { recursive: true, force: true });
await mkdir(path.dirname(OUT_DIR), { recursive: true });
await cp(publicDir, OUT_DIR, { recursive: true });
await writeFile(path.join(OUT_DIR, "index.html"), html);

// 4. Baixar cada fotografia para dentro da pasta.
let photos = 0;
for (const file of await readdir(path.join(ROOT, "src/assets"))) {
  if (!file.endsWith(".asset.json")) continue;
  const asset = JSON.parse(
    await readFile(path.join(ROOT, "src/assets", file), "utf8"),
  );
  if (typeof asset.url !== "string" || !asset.url.startsWith(CDN_PREFIX)) continue;
  const destination = path.join(
    OUT_DIR,
    LOCAL_PREFIX.slice(1),
    asset.url.slice(CDN_PREFIX.length),
  );
  await mkdir(path.dirname(destination), { recursive: true });
  const response = await fetch(DEV_SERVER + asset.url);
  if (!response.ok) {
    console.error(`Não consegui baixar ${asset.url}: HTTP ${response.status}`);
    process.exit(1);
  }
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  photos += 1;
}

// 5. Apontar o código gerado para as cópias locais.
async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let rewritten = 0;
for await (const file of walk(OUT_DIR)) {
  if (!TEXT_EXT.has(path.extname(file).toLowerCase())) continue;
  const source = await readFile(file, "utf8");
  if (!source.includes(CDN_PREFIX)) continue;
  await writeFile(file, source.replaceAll(CDN_PREFIX, LOCAL_PREFIX));
  rewritten += 1;
}

// 6. Instruções de publicação junto da pasta.
await writeFile(
  path.join(OUT_DIR, "COMO-PUBLICAR.txt"),
  `Fornalha Carioca — pasta pronta para o Netlify

1. Abra https://app.netlify.com/drop
2. Arraste esta pasta inteira para a página.
3. O Netlify mostra o endereço do site em poucos segundos.

A pasta já traz a página, os estilos, os scripts e as fotografias. Nada aqui
depende do Lovable nem de um servidor.

O site é demonstrativo: pizzaria fictícia de portfólio, com preços, endereço e
telefone fictícios e sem pedidos reais.

Para refazer esta pasta depois de mexer no site:
  bun run export:netlify
`,
);

console.log(
  `Pasta pronta em ${OUT_DIR} — ${photos} fotografias locais, ${rewritten} arquivos ajustados.`,
);
