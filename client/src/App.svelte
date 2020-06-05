<script>
import axios from "axios"

let emoji = {}

axios.get('https://api.github.com/emojis')
  .then(function (response) {
    // handle success
	console.log(response);
	emoji = response.data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
</script>

<p> {emoji.abcd} </p>