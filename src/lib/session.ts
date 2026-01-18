import { cookies } from "next/headers";
import { decodeJwt } from "jose";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session");

  if (!token) return null;

  try {
    const payload = decodeJwt(token.value);
    return {
      id: payload.id as string,
      role: payload.role as string,
      email: payload.email as string,
    };
  } catch {
    return null;
  }
}
