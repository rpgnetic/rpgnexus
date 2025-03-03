import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 dias
    },
    cookies: {
        state: {
            name: 'next-auth.state',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production'
            }
        }
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) return url;
            return baseUrl + "/campaigns";
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub;
                session.user.accessToken = token.accessToken as string;
            }
            return session;
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
    },
    pages: {
        signIn: "/",
        error: "/error",
    },
    debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
