<script>
import axios from "axios"
import { fromHexcodeToCodepoint } from 'emojibase';
import { fromCodepointToUnicode } from 'emojibase';

let emojis = []

axios.get('https://api.github.com/emojis')
  .then(function (response) {
    // handle success
	console.log(response);
	emojis = Object.entries(response.data);
	emojis.forEach(em => {
		var code = fromHexcodeToCodepoint(em[1].split("?")[0].split("/").splice(-1)[0].split(".")[0].toUpperCase())
		em[1] = code == "NaN" ? "<img src=\"" + em[1] + "\">" :fromCodepointToUnicode(code)
		// em[1] = "&#x" + em[1].split("?")[0].split("/").splice(-1)[0].split(".")[0].toUpperCase()

	});

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
</script>


{#each emojis as emoji, index (emoji)}
	<span style='font-size:30px;'>
	<!-- {emoji[0]}:  -->
	{@html emoji[1]}
	</span>
{/each}
