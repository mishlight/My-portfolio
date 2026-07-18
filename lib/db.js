import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");
fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, "portfolio.db"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    year TEXT NOT NULL,
    class_name TEXT NOT NULL,
    mark TEXT NOT NULL,
    note TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const count = db.prepare("SELECT COUNT(*) AS total FROM projects").get();
if (count.total === 0) {
  const insert = db.prepare(`
    INSERT INTO projects (id, title, type, year, class_name, mark, note, sort_order)
    VALUES (@id, @title, @type, @year, @className, @mark, @note, @sortOrder)
  `);
  const seed = db.transaction((projects) => projects.forEach((project) => insert.run(project)));
  seed([
    { id: 1, title: "Noma / Field Notes", type: "Brand system · Digital", year: "2025", className: "project-blue", mark: "N/F", note: "A living identity for a new kind of travel journal.", sortOrder: 1 },
    { id: 2, title: "Forma Objects", type: "Art direction · Commerce", year: "2024", className: "project-coral", mark: "F.", note: "Turning everyday furniture into objects of desire.", sortOrder: 2 },
    { id: 3, title: "Otherworld Radio", type: "Product · Web experience", year: "2025", className: "project-dark", mark: "(( O ))", note: "A tactile listening room for independent sound.", sortOrder: 3 }
  ]);
}

export default db;
