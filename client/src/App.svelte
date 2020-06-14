<script>
import axios from "axios"
import { fromHexcodeToCodepoint, fromCodepointToUnicode } from 'emojibase';

import * as config from "../config.json"

let emojis = []

axios.get('https://api.github.com/emojis')
  .then(function (response) {
    // handle success
	emojis = Object.entries(response.data);
	axios.get('https://emoji-api.com/emojis?access_key=' + config.emoji_api)
	.then((res) => {
		console.log(res.data);	
	})
	emojis.forEach(em => {
		var code = fromHexcodeToCodepoint(em[1].split("?")[0].split("/").splice(-1)[0].split(".")[0].toUpperCase())
		// var code = em[1].split("?")[0].split("/").splice(-1)[0].split(".")[0].split("-").map(num => parseInt(num, 16)
		
		em[1] = code == "NaN" ? "<img src=\"" + em[1] + "\">" : code.map(num => "&#" + num + ";").join("&zwj;")

	}); 

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  
</script>


{#each emojis as emoji, index (emoji)}
	<span>
	<!-- {emoji[0]}:  -->
	{@html emoji[1]}
	</span>
	<!-- <img src={emoji[1]} alt={emoji[0]}> -->
{/each}
