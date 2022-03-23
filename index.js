const fs = require("fs");
const path = require("path");
const axios = require("axios");

const GITHUB_EMOJI_URL = "https://api.github.com/emojis"
const EMOJI_SHORTCODES_URL = "https://cdn.jsdelivr.net/npm/emojibase-data@latest/en/shortcodes/github.json"
const EMOJI_DETAILS_URL = "https://cdn.jsdelivr.net/npm/emojibase-data@latest/en/data.json"
const EMOJI_GROUPS_URL = "https://cdn.jsdelivr.net/npm/emojibase-data@latest/en/messages.json"

const github_file_path = path.join("data", "github_emojis.json");
const emoji_shortcodes_file_path = path.join("data", "emojibase_shortcodes.json");
const emojis_details_file_path = path.join("data", "emojibase_details.json");
const emojis_groups_file_path = path.join("data", "emojibase_groups.json");

function writeData(file_path, data) {
    try {
        fs.writeFileSync(file_path, JSON.stringify(data, null, 4));
    } catch (err) {
        console.error(err);
    }
}

function readData(file_path) {
    const data = JSON.parse(fs.readFileSync(file_path, 'utf-8'))
    return data
}

async function fetchData(URL) {
    const emoji_data = await axios.get(URL);
    return emoji_data.data

}

async function main() {

    const github_emojis = await fetchData(GITHUB_EMOJI_URL);

    var github_emojis_arr = Object.entries(github_emojis);
    var exclusive_emojis = {};
    github_emojis_arr.forEach((em) => {
        if(!em[1].includes("unicode"))
        exclusive_emojis[em[0]] = em[1];
    });

    writeData(github_file_path, exclusive_emojis)

    const emoji_shortcodes = await fetchData(EMOJI_SHORTCODES_URL);
    const emojis_details = await fetchData(EMOJI_DETAILS_URL);
    const emojis_groups = await fetchData(EMOJI_GROUPS_URL);

    writeData(emoji_shortcodes_file_path, emoji_shortcodes)
    writeData(emojis_details_file_path, emojis_details)
    writeData(emojis_groups_file_path, emojis_groups)

    var shortcodes = []

    emojis_details.forEach(emoji => {
        if(emoji['hexcode'] in emoji_shortcodes){
            shortcode_name = emoji_shortcodes[emoji['hexcode']]
            if(!Array.isArray(shortcode_name)){
                shortcode_name = [shortcode_name]
            }
            emoji["shortcode"] = shortcode_name
            delete emoji["hexcode"];
            delete emoji["text"];
            delete emoji["type"];
            delete emoji["order"];
            delete emoji["version"];
            delete emoji["skins"];
            delete emoji["gender"];
            delete emoji["emoticon"];

            var group = emojis_groups["groups"].find((e) => e.order == emoji["group"]);
            var subgroup = emojis_groups["subgroups"].find((e) => e.order == emoji["subgroup"]);

            emoji["group"] = group["message"]
            emoji["subgroup"] = subgroup["message"]

            shortcodes.push(emoji)
        }
    });

    shortcodes.push(exclusive_emojis)

    const emoji_cons_file_path = path.join("data", "emoji_cons.json");

    writeData(emoji_cons_file_path, shortcodes)

}

main();

