# 1Login NodeJS SDK
This is the OneLogin SDK for NodeJS.

Example:
```typescript
import { OneLogin } from "1login";

const oneLogin = new  OneLogin({
	clientId:  "<client_id>",
	clientSecret:  "<client_secret>",
});

(async () => {
	const accessToken = await oneLogin.getAccessToken("ephemeral_token");
	const profile = await oneLogin.getUser(accessToken);
	console.log(profile);
})();
```

Website: https://1login.xyz