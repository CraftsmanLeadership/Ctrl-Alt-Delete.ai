import fs from "fs";
import path from "path";

const TOPICS_PATH = path.join(process.cwd(), "content", "topics", "ctrl_alt_del.topics.json");
const OUT_DIR = path.join(process.cwd(), "content", "generated");

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function main() {
  ensureDir(OUT_DIR);

  const raw = fs.readFileSync(TOPICS_PATH, "utf8");
  const data = JSON.parse(raw);

  if (!data.topics || !Array.isArray(data.topics)) {
    throw new Error("Expected { topics: [...] } in ctrl_alt_del.topics.json");
  }

  const created = [];

  for (const t of data.topics) {
    const title = t.title?.trim();
    if (!title) continue;

    const slug = slugify(title);
    const file = path.join(OUT_DIR, `${slug}.md`);

    if (fs.existsSync(file)) continue;

    const frontmatter = [
      "---",
      `title: "${title.replace(/"/g, '\\"')}"`,
      `difficulty: "${t.difficulty || "beginner"}"`,
      `tier: "${t.tier || "strategic"}"`,
      `tags: [${(t.tags || []).map((x) => `"${String(x).replace(/"/g, '\\"')}"`).join(", ")}]`,
      `sourceTopicsFile: "content/topics/ctrl_alt_del.topics.json"`,
      "---",
      ""
    ].join("\n");

    const stub =
      `${frontmatter}` +
      `## Problem\n\n` +
      `## Why It Matters\n\n` +
      `## What’s Broken\n\n` +
      `## The Fix\n\n` +
      `## What This Changes\n\n`;

    fs.writeFileSync(file, stub, "utf8");
    created.push(path.basename(file));
  }

  console.log(\`Created \${created.length} stub(s):\`);
  for (const f of created) console.log(\`- \${f}\`);
}

main();
