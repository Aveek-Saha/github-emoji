import App from './App.svelte';
import * as emojiData from '../../data/github_emoji_shortcodes.json'; 
import * as colorData from '../../data/colors.json'; 

const app = new App({
	target: document.body,
	props: {
		emojis: emojiData,
		color_codes: colorData
	}
});

export default app;