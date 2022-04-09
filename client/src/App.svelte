<script>
    export let emojis;
    let common = emojis["common"];

    let colors = [ "#fbcfb7", "#7f39fb", "#fb584a", "#ffdb3a", "#ef5350", "#ff7281", "#fbb64b", "#ff5864", "#80deea", "#f94f28", "#8cd842", "#00a9f0", "#cedae6", "#64b5f6", "#ffb74d", "#ff9d44", "#e7f4ff", "#c7cb12", "#ffc400", "#d9e3e8", "#40c4ff", "#cb63e6", "#83beec", "#23b4d2", "#00e676", "#e6ebef", "#fdd0ae", "#4dc6dc", "#a78674", "#39c2f1", "#56d1d8", "#536dfe", "#8bdfe7", "#c5e763", "#f74d5f", "#ffce49", "#ef584a", "#00b1fb", "#77e856", "#ffe55f", "#ff6723", "#86B837"];
</script>

<main>
    <div class="container">
        <div class="row row-cols-6 row-cols-sm-2 row-cols-md-4 row-cols-xs-1">
            {#each common as emoji}
                <div class="col mb-3 text-center">
                    <div class="card h-100">
                        <div class="card-header" style="background-color: {colors[Math.floor(Math.random()*colors.length)]};">
                            <p class="emoji">{emoji.emoji}</p>
                        </div>
                        <div class="card-body">
                            <h6 class="card-title">{emoji.shortcode[0]}</h6>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</main>
