import { z } from "zod";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import type {} from "next-auth/jwt";

// Ref: https://authjs.dev/getting-started/typescript
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  }
}

declare module "next-auth" {
  interface User {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  }
}

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        remember_me: {},
      },
      authorize: async (credentials) => {
        const { email } = await signInSchema.parseAsync(credentials);
        return {
          email: email,
          access_token: "access_token",
          refresh_token: "refresh_token",
          expires_at: Date.now() + 1 * 60 * 60 * 1000, // 1 hour
        };
      },
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/refresh-token-rotation
    jwt: async ({ token, user, account }) => {
      if (account && user) {
        // First-time login, save the `access_token` and the `refresh_token`
        return {
          ...token,
          access_token: user.access_token,
          refresh_token: user.refresh_token,
          expires_at: user.expires_at,
        };
      }

      if (Date.now() < token.expires_at * 1000) {
        // Subsequent logins, but the `access_token` is still valid
        return token;
      }

      // Subsequent logins, try to refresh it
      if (!token.refresh_token) {
        throw new TypeError("Missing refresh_token");
      }

      try {
        // Refresh token to the auth provider
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            body: JSON.stringify({ refresh_token: token.refresh_token }),
          },
        );

        const tokensOrError = await response.json();

        if (!response.ok) {
          throw tokensOrError;
        }

        const newTokens = tokensOrError as {
          access_token: string;
          expires_in: number;
          refresh_token?: string;
        };

        token.access_token = newTokens.access_token;
        token.expires_at = Math.floor(Date.now() / 1000 + newTokens.expires_in);

        // Some providers only issue refresh tokens once, so preserve if we did not get a new one
        if (newTokens.refresh_token) {
          token.refresh_token = newTokens.refresh_token;
        }
        return token;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error refreshing access_token", error);
        // If we fail to refresh the token, return an error so we can handle it on the page
        token.error = "RefreshTokenError";
        return token;
      }
    },
    // Ref:
    // - https://authjs.dev/guides/extending-the-session#with-jwt
    // - https://authjs.dev/getting-started/typescript
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          access_token: token.access_token,
          refresh_token: token.refresh_token,
        },
      };
    },
  },
});
