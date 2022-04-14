<script>
	import { SvelteToast, toast } from "@zerodevx/svelte-toast";
	const options = {};
	new ClipboardJS(".card");
    export let emojis;
    let common = emojis["common"];
	let search = "";

    let colors = [ "#fbcfb7", "#7f39fb", "#fb584a", "#ffdb3a", "#ef5350", "#ff7281", "#fbb64b", "#ff5864", "#80deea", "#f94f28", "#8cd842", "#00a9f0", "#cedae6", "#64b5f6", "#ffb74d", "#ff9d44", "#e7f4ff", "#c7cb12", "#ffc400", "#d9e3e8", "#40c4ff", "#cb63e6", "#83beec", "#23b4d2", "#00e676", "#e6ebef", "#fdd0ae", "#4dc6dc", "#a78674", "#39c2f1", "#56d1d8", "#536dfe", "#8bdfe7", "#c5e763", "#f74d5f", "#ffce49", "#ef584a", "#00b1fb", "#77e856", "#ffe55f", "#ff6723", "#86B837"];

	function createToast() {
        toast.pop();
        toast.push("Emoji shortname copied!", {
            theme: {
                "--toastBackground": "#48BB78",
                "--toastProgressBackground": "#2F855A",
            },
            duration: 3000,
        });
    }

	$: list = common
        ? common.filter(
              (item) =>
                  (item.tags.join(" ")+item.shortcode.join(" ")+item.label).toLowerCase().indexOf(search.toLowerCase()) !== -1
          )
        : [];
</script>

<main>
    <div class="container">
		
        <div class="row">
            <header class="header mt-5 mb-4">
                <h1 class="header__title">GitHub Emoji</h1>
                <p class="header__item">
                    <a href="https://github.com/Aveek-Saha/gmoji">
                        <i
                            class="bi-github me-2"
                            role="img"
                            aria-label="GitHub"
                        />GitHub
                    </a>
                </p>
            </header>
        </div>
        <div class="row sticky-top">
            <div class="mb-4">
                <input
                    type="text"
                    bind:value={search}
                    class="form-control search"
                    id="search"
                    placeholder="Search"
                />
            </div>
        </div>
        <div class="row row-cols-lg-6 row-cols-sm-2 row-cols-md-4 row-cols-xs-1">
            {#each list as emoji}
                <div class="col mb-3 text-center">
                    <div class="card h-100" data-clipboard-text=":{emoji.shortcode[0]}:" on:click={() => createToast()}>
                        <div class="card-header" style="background-color: {colors[Math.floor(Math.random()*colors.length)]};">
                            <p class="emoji">{emoji.emoji}</p>
                        </div>
                        <div class="card-body">
                            <h6 class="card-title m-2">{emoji.shortcode[0]}</h6>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</main>
<SvelteToast {options} />
