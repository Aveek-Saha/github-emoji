<script>
import axios from "axios"
import { fromHexcodeToCodepoint, fromCodepointToUnicode } from 'emojibase';
import ifEmoji from 'if-emoji'


import * as config from "../config.json"

let emojis = []

axios.get('https://api.github.com/emojis')
  .then(function (response) {
    // handle success
	var arr = Object.entries(response.data);
	axios.get('https://emoji-api.com/emojis?access_key=' + config.emoji_api)
	.then((res) => {
		// console.log(res.data);	
		emojis = res.data
		arr.forEach(em => {
			var hex = em[1].split("?")[0].split("/").splice(-1)[0].split(".")[0].toUpperCase()
			var code = fromHexcodeToCodepoint(hex)
			// var code = em[1].split("?")[0].split("/").splice(-1)[0].split(".")[0].split("-").map(num => parseInt(num, 16)
			var dis = code == "NaN" ? "<img src=\"" + em[1] + "\">" : code.map(num => "&#" + num + ";").join("&zwj;")
			// emojis.push({
			// 	shortcode: em[0],
			// 	display: dis
			// })
			console.log(emojis.find(x => x.codePoint === hex.split("-").join(" ")));
			// console.log(hex.split("-").join(" "));

			
			// emojis.find(x => x.codePoint === code)
		});
	})

	

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  
</script>


{#each emojis as emoji, index (emoji)}
	{#if ifEmoji(emoji.character)}
		<span>
			{@html emoji.character}
		</span>
	{/if}
	<!-- <img src={emoji.display} alt={emoji.shortcode}> -->
{/each}
