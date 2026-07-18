import initSqlJs from "sql.js";
import wasmUrl from "sql.js/dist/sql-wasm.wasm?url";

const storageKey = "alex-morgan-portfolio-sqlite";

function fromBase64(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

function toBase64(bytes) {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

const databasePromise = (async () => {
  const SQL = await initSqlJs({ locateFile: () => wasmUrl });
  const saved = localStorage.getItem(storageKey);
  const db = saved ? new SQL.Database(fromBase64(saved)) : new SQL.Database();
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY, title TEXT NOT NULL, type TEXT NOT NULL, year TEXT NOT NULL,
      class_name TEXT NOT NULL, mark TEXT NOT NULL, note TEXT NOT NULL, sort_order INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL,
      message TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  const total = db.exec("SELECT COUNT(*) FROM projects")[0]?.values[0]?.[0] || 0;
  if (!total) {
    const rows = [
      [1, "Noma / Field Notes", "Brand system · Digital", "2025", "project-blue", "N/F", "A living identity for a new kind of travel journal.", 1],
      [2, "Forma Objects", "Art direction · Commerce", "2024", "project-coral", "F.", "Turning everyday furniture into objects of desire.", 2],
      [3, "Otherworld Radio", "Product · Web experience", "2025", "project-dark", "(( O ))", "A tactile listening room for independent sound.", 3]
    ];
    rows.forEach((row) => db.run("INSERT INTO projects VALUES (?, ?, ?, ?, ?, ?, ?, ?)", row));
    localStorage.setItem(storageKey, toBase64(db.export()));
  }
  return db;
})();

export async function getProjects() {
  const db = await databasePromise;
  const result = db.exec("SELECT id, title, type, year, class_name, mark, note FROM projects ORDER BY sort_order")[0];
  if (!result) return [];
  return result.values.map(([id, title, type, year, className, mark, note]) => ({
    id: String(id).padStart(2, "0"), title, type, year, className, mark, note
  }));
}

export async function saveInquiry({ name, email, message }) {
  if (!name?.trim() || !email?.includes("@") || !message?.trim()) throw new Error("Invalid inquiry");
  const db = await databasePromise;
  db.run("INSERT INTO inquiries (name, email, message) VALUES (?, ?, ?)", [
    name.trim().slice(0, 100), email.trim().slice(0, 180), message.trim().slice(0, 3000)
  ]);
  localStorage.setItem(storageKey, toBase64(db.export()));
}
