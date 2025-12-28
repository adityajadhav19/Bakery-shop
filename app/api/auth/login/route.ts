import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response("Email and password are required", { status: 400 });
    }

    // ======================
    // 1️⃣ CHECK ADMIN FIRST
    // ======================
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (admin) {
      const isValid = await bcrypt.compare(password, admin.password);
      if (!isValid) {
        return new Response("Invalid credentials", { status: 401 });
      }

      const token = jwt.sign(
        { role: "admin", id: admin.id },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      );

      return Response.json({
        role: "admin",
        token,
        redirect: "/admin",
      });
    }

    // ======================
    // 2️⃣ CHECK USER
    // ======================
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const isUserValid = await bcrypt.compare(password, user.password);
    if (!isUserValid) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const token = jwt.sign(
      { role: "user", id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // ✅ RETURN USERNAME FROM DB
    return Response.json({
      role: "user",
      token,
      username: user.username,
      redirect: "/User",
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}
