import App from './App.svelte';
import * as emojiData from '../../data/github_emoji_shortcodes.json'; 

const app = new App({
	target: document.body,
	props: {
		emojis: emojiData
	}
});

export default app;