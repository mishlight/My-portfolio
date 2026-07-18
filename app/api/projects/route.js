import db from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const database = await db;
  const statement = database.prepare(`
    SELECT id, title, type, year, class_name AS className, mark, note
    FROM projects ORDER BY sort_order ASC
  `);
  const rows = [];
  while (statement.step()) rows.push(statement.getAsObject());
  statement.free();

  return Response.json(rows.map((row) => ({ ...row, id: String(row.id).padStart(2, "0") })));
}
