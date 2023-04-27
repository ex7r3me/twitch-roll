
# Twitch Roll

Random fun dice roll for Twitch that runs on CloudFlare workers
## Environment Variables

To run this project, you will need to add the following environment variables to your `.dev.vars` file

`TWITCH_CLIENT_ID`

`TWITCH_CLIENT_SECRET`

Register an app and get your client ID and Secret from [Twitch Developer Console](https://dev.twitch.tv/console)

Add the callback url to the acceptable OAuth Redirect URLs 
- Development: http://localhost:8787/twitch/callback)
- Production: https://example.com/twitch/callback

You can use nightbot or other chatbots to connect Twitch to the app
## API Reference

#### To start authentication

```http
  GET /twitch/auth
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

