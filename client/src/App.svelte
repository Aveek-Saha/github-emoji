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
		// emojis = res.data
		arr.forEach(em => {
			var hex = em[1].split("?")[0].split("/").splice(-1)[0].split(".")[0].toUpperCase()
			var code = fromHexcodeToCodepoint(hex)
			// var code = em[1].split("?")[0].split("/").splice(-1)[0].split(".")[0].split("-").map(num => parseInt(num, 16)
			var dis = code == "NaN" ? "<img src=\"" + em[1] + "\">" : code.map(num => "&#" + num + ";").join("&zwj;")
			
			var data = res.data.find(x => x.codePoint === hex.split("-").join(" "));
			// console.log(data);
			if (data) {
				data.image = em[1]
				data.shortcode = em[0]
			}
			else{
				data = {
					display: code == "NaN" ? "<img src=\"" + em[1] + "\">" : code.map(num => "&#" + num + ";").join("&zwj;"),
					image: em[1],
					shortcode: em[0]
				}
			}
			
			emojis.push(data)
			// console.log(hex.split("-").join(" "));
		});
		emojis = emojis
	})

	

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  
</script>


{#each emojis as emoji}
	{#if emoji.character && ifEmoji(emoji.character)}
		<span>
			{emoji.character}
		</span>
	{:else if emoji.display }
		<!-- <img src={emoji.image} alt={emoji.shortcode}> -->
		<span>
			{@html emoji.display}
		</span>
	{/if}
{/each}
