import KeycloakProvider from "next-auth/providers/keycloak";
import {console} from "next/dist/compiled/@edge-runtime/primitives";
import jwt_decode from "jwt-decode";


async function refreshAccessToken(token) {
    const resp = await fetch(`${process.env.KEYCLOAK_REFRESH_TOKEN_URL}`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: process.env.KEYCLOAK_ID,
            client_secret: process.env.KEYCLOAK_SECRET,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
        }),
        method: "POST",
    });
    const refreshToken = await resp.json();
    if (!resp.ok) throw refreshToken;

    return {
        ...token,
        access_token: refreshToken.access_token,
        decoded: jwt_decode(refreshToken.access_token),
        id_token: refreshToken.id_token,
        expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
        refresh_token: refreshToken.refresh_token,
    };
}

export const options = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_ID,
            clientSecret: process.env.KEYCLOAK_SECRET,
            issuer: process.env.KEYCLOAK_ISSUER,
        })
    ],
    callbacks: {
        async jwt({token, account}) {
            const nowTimeStamp = Math.floor(Date.now() / 1000);

            if (account) {
                token.access_token = account.access_token;
                token.decoded = jwt_decode(account.access_token);
                token.id_token = account.id_token;
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_token;
                return token;
            } else if (nowTimeStamp < token.expires_at) {
                // token has not expired yet, return it
                return token;
            } else {
                // token is expired, try to refresh it
                console.log("Token has expired. Will refresh...")
                try {
                    const refreshedToken = await refreshAccessToken(token);
                    console.log("Token is refreshed.")
                    return refreshedToken;
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    return null; //Return null to terminate session
                    //return {...token, error: "RefreshAccessTokenError"};
                }
            }
        },
        async session({session, token}) {
            session.access_token = token.access_token;
            session.id_token = token.id_token;
            session.roles = token.roles;
            session.roles = token.decoded.realm_access.roles;
            session.error = token.error;
            return session;
        },
    },
    events: {
        async signOut({token}) {
            try {
                const logOutUrl = new URL(`${process.env.END_SESSION_URL}`);
                logOutUrl.searchParams.set("id_token_hint", token.id_token);

                await fetch(logOutUrl);
            } catch (err) {
                console.error(err);
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}