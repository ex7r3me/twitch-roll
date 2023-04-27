/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { getRandomPrompt } from './prompts.js'
import { getTokenInfo, exchangeCode, RefreshingAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { Router } from 'itty-router';
import uuid from 'lil-uuid';

const router = Router();

router.get('/twitch/auth', (_request, { TWITCH_CLIENT_ID, BASE_URL }) => {
	console.log(TWITCH_CLIENT_ID)
	const clientId = TWITCH_CLIENT_ID
	const redirectUri = `${BASE_URL}/twitch/callback`;
	const scopes = ['moderator:read:chatters']
	const url = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes.join(' ')}`
	return Response.redirect(url)
});
router.get('/twitch/callback', async ({ query }, { TWITCH_TOKEN_SPACE, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, BASE_URL }) => {
	try {
		const code = query.code
		const clientId = TWITCH_CLIENT_ID
		const clientSecret = TWITCH_CLIENT_SECRET
		const redirectUri = `${BASE_URL}/twitch/callback`;
		const tokenData = await exchangeCode(clientId, clientSecret, code, redirectUri);
		const tokenId = uuid()
		await TWITCH_TOKEN_SPACE.put(`tokenData-${tokenId}`, JSON.stringify(tokenData))

		return Response.redirect(`${BASE_URL}/${tokenId}`)
	} catch (e) {
		console.log(e)
		return new Response('Error')
	}
});
const noUser = 'ヽ( ͝ ° ͜ʖ͡° )ﾉ'
router.get('/roll/:id', async ({ query, params }, { TWITCH_TOKEN_SPACE, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET }) => {
	const tokenId = params.id
	const clientId = TWITCH_CLIENT_ID
	const clientSecret = TWITCH_CLIENT_SECRET
	const user = query.user
	const channel = query.channel
	try {
		const tokenData = JSON.parse(await TWITCH_TOKEN_SPACE.get(`tokenData-${tokenId}`))
		const authProvider = new RefreshingAuthProvider(
			{
				clientId,
				clientSecret,
				onRefresh: async (_userId, newTokenData) => {
					await TWITCH_TOKEN_SPACE.put(`tokenData-${tokenId}`, JSON.stringify(newTokenData))
				}
			}
		);

		await authProvider.addUserForToken(tokenData);
		const ownerUserId = (await getTokenInfo(tokenData.accessToken)).userId

		const apiClient = new ApiClient({ authProvider });

		let chatters = []
		try {
			chatters = await apiClient.chat.getChatters(ownerUserId, ownerUserId)
		} catch (e) {
			console.log(e)
		}
		const viewers = chatters.data.map((c) => c.userDisplayName)
		const filteredViewers = viewers.filter((viewer) => viewer !== 'Nightbot' && viewer !== 'StreamElements' && viewer !== user);
		const randomChatter = filteredViewers[Math.floor(Math.random() * filteredViewers.length)] || noUser
		randomChatter === noUser ? noUser : `@${randomChatter}`
		const diceRoll = Math.floor(Math.random() * 20) + 1;
		const random1 = Math.floor(Math.random() * 100) + 1;
		const random2 = Math.floor(Math.random() * 400) + 100;
		const random3 = Math.floor(Math.random() * 1500) + 500;
		const promptList = getRandomPrompt({ diceRoll, channel, ogChatter: `@${user}`, randomChatter, random1, random2, random3 })
		const prompt = `@${user} rolled a ${diceRoll}! ` + promptList[Math.floor(Math.random() * promptList.length)];

		return new Response(prompt);


	} catch (e) {
		console.log("BROKEN DICE", e)
		return new Response('Dice is dizzy, try again ╰( ⁰ ਊ ⁰ )━☆ﾟ.*･｡ﾟ ')
	}
});
router.get('/', (_request, { BASE_URL }) => {
	return new Response(`( •̀ᴗ•́ )و ̑̑ \n Go to ${BASE_URL}/twitch/auth to get started!`);
});
router.get('/:id', ({params}, { BASE_URL }) => {
	return new Response(`( •̀ᴗ•́ )و ̑̑ \nNightbot command:$(urlfetch ${BASE_URL}/roll/${params.id}?user=$(user)&channel=$(channel))`);
});
router.all('*', () => new Response('404, not found!', { status: 404 }));

export default {
	fetch: router.handle
};
