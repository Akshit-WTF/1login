import { OneLogin } from ".";

const oneLogin = new OneLogin({
  clientId: "<client_id>",
  clientSecret: "<client_secret>",
});

(async () => {
  const accessToken = await oneLogin.getAccessToken("ephemeral_token");

  const profile = await oneLogin.getUser(accessToken);

  console.log(profile);
})();
