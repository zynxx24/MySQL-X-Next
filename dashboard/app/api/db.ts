import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost", // Replace with your DB host
  user: "root",      // Replace with your DB user
  password: "password", // Replace with your DB password
  database: "test_db",  // Replace with your DB name
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const [rows] = await db.query("SELECT * FROM table1");
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const { name, related_id } = req.body;
      const result = await db.query("INSERT INTO table1 (name, related_id) VALUES (?, ?)", [name, related_id]);
      return res.status(201).json({ id: result.insertId });
    }

    if (req.method === "PUT") {
      const { id, name, related_id } = req.body;
      await db.query("UPDATE table1 SET name = ?, related_id = ? WHERE id = ?", [name, related_id, id]);
      return res.status(200).json({ message: "Updated successfully" });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      await db.query("DELETE FROM table1 WHERE id = ?", [id]);
      return res.status(200).json({ message: "Deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
