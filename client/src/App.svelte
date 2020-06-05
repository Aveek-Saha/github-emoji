<script>
import axios from "axios"

let emojis = []

axios.get('https://api.github.com/emojis')
  .then(function (response) {
    // handle success
	console.log(response);
	emojis = Object.entries(response.data);

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
</script>


{#each emojis as emoji, index (emoji)}
	<li>
	{emoji[0]}
	<img src={emoji[1]} alt="emoji">
	</li>
{/each}
