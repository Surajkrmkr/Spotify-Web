import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token){
    try{
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const {body: refreshedToken} = await spotifyApi.refreshAccessToken();
        console.log("Refreshed token: ", refreshedToken);
        
        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpiresAt: Date.now + refreshedToken.expires_in * 1000,
            refreshedToken : refreshedToken.refresh_token ?? token.refreshToken,
        }

    }catch{
        console.log("refreshAccessToken error")
        return {
            ...token,
            error : "refreshAccessToken error"
        }
    }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      authorization : LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret : process.env.JWT_SECRET,
  pages:{
      signIn: "/login",
  },
  callbacks:{
      async jwt({token,account,user}){
          //initial Sign in
          if(account && user){
              return {
                  ...token,
                  accessToken: account.access_token,
                  refreshToken: account.refresh_token,
                  username: account.providerAccountId,
                  accessTokenExpiresAt: account.expires_at * 1000,
              }
          }

          // if access toke is not expired yet
          if(Date.now() < token.accessTokenExpiresAt){
              console.log("existing token is valid")
              return token;
          }

          // if access token is expired
          console.log("existing token is expired,refreshing");
          return await refreshAccessToken(token);
      },
      async session({session,token}){
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;

        return session;
      }
  },
})