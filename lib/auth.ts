import jwt from "jsonwebtoken";

/**
 * Verifies whether the request is from an admin
 * Returns decoded token if valid, otherwise null
 */
export function verifyAdmin(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded; // valid admin
  } catch (error) {
    return null; // invalid / expired token
  }
}
