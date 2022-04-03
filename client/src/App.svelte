<script>
	export let emojis;
	let common = emojis['common']
</script>

<main>
	{#each common as emoji}
		<span>{emoji.emoji}</span>
	{/each}
</main>