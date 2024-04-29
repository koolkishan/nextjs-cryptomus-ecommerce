import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  try {
    let data;

    if (email) {
      const verificationToken = await generateVerificationToken(email);
      data = await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
