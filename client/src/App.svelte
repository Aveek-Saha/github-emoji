<script>
import axios from "axios"
import { fromHexcodeToCodepoint, fromCodepointToUnicode } from 'emojibase';

let emojis = []

axios.get('https://api.github.com/emojis')
  .then(function (response) {
    // handle success
	console.log(response);
	emojis = Object.entries(response.data);
	emojis.forEach(em => {
		var code = fromHexcodeToCodepoint(em[1].split("?")[0].split("/").splice(-1)[0].split(".")[0].toUpperCase())
		// var code = em[1].split("?")[0].split("/").splice(-1)[0].split(".")[0].split("-").map(num => parseInt(num, 16))
		// try {
		// 	code = String.fromCodePoint(code);
		// }
		// catch(err) {
		// 	code = "<img src=\"" + em[1] + "\">"
		// 	console.log(err);	
		// }
		// em[1] = code == "NaN" ? "<img src=\"" + em[1] + "\">" : fromCodepointToUnicode(code)
		// console.log(em[1].split("?")[0].split("/").splice(-1)[0].split(".")[0].toUpperCase().split("-"));
		
		em[1] = code.map(num => "&#" + num + ";").join("&zwj;")
		// em[1] = "<img src=\"" + em[1] + "\">"

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
	<!-- <img src={emoji[1]} alt={emoji[0]}> -->
{/each}
