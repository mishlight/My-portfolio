import db, { persist } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();
    if (!name?.trim() || !email?.trim() || !message?.trim() || !email.includes("@")) {
      return Response.json({ error: "Please complete every field with a valid email." }, { status: 400 });
    }

    const database = await db;
    database.run("INSERT INTO inquiries (name, email, message) VALUES (?, ?, ?)", [
      name.trim().slice(0, 100),
      email.trim().slice(0, 180),
      message.trim().slice(0, 3000)
    ]);
    persist(database);

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Your message could not be saved. Please try again." }, { status: 500 });
  }
}
