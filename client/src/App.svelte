<script>
	export let emojis;
	let common = emojis['common']
</script>

<main>
	<div class="container">
		<div class="row row-cols-6">
			{#each common as emoji}
				<div class="col text-center">{emoji.emoji}</div>
			{/each}
		</div>
	</div>
</main>