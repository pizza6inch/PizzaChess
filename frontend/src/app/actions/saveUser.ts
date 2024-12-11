// app/actions/saveUser.ts
"use server";

import clientPromise from "@/lib/mongodb";

export async function saveUser(data: { name: string; email: string }) {
  try {
    const client = await clientPromise;
    const db = client.db("myDatabase"); // 替換為你的資料庫名稱
    const collection = db.collection("users");

    const result = await collection.insertOne({
      name: data.name,
      email: data.email,
      createdAt: new Date(),
    });

    return { success: true, userId: result.insertedId };
  } catch (error) {
    console.error("Error saving user:", error);
    return { success: false, error: "Failed to save user" };
  }
}
