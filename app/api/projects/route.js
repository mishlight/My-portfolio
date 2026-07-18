import db from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = db.prepare(`
    SELECT id, title, type, year, class_name AS className, mark, note
    FROM projects ORDER BY sort_order ASC
  `).all();

  return Response.json(rows.map((row) => ({ ...row, id: String(row.id).padStart(2, "0") })));
}
