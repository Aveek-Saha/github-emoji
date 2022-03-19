const fs = require("fs");
const path = require("path");
const axios = require("axios");

const { fromHexcodeToCodepoint, fromCodepointToUnicode, fetchShortcodes } = require("emojibase");

const config = require("./config.json")

// import ifEmoji from "if-emoji";

async function main() {
    // const githubEmojis = await axios.get("https://api.github.com/emojis");
    const file_path = path.join("data", "github_emojis.json");

    // var ghEmojiArr = Object.entries(githubEmojis.data);
    // var emojis = {};
    // ghEmojiArr.forEach((em) => {
    //     if(!em[1].includes("unicode"))
    //         emojis[em[0]] = em[1];
    // });

    // try {
    //     fs.writeFileSync(file_path, JSON.stringify(emojis, null, 4));
    // } catch (err) {
    //     console.error(err);
    // }

    // const emojiApi = await axios.get("https://emoji-api.com/emojis?access_key=" + config.emoji_api);
    // const emojApi_file_path = path.join("data", "emoji_api.json");

    // const emojiApi_data = emojiApi.data

    // try {
    //     fs.writeFileSync(emojApi_file_path, JSON.stringify(emojiApi_data, null, 4));
    // } catch (err) {
    //     console.error(err);
    // }

    // const emoji_shortcodes = await axios.get("https://cdn.jsdelivr.net/npm/emojibase-data@latest/en/shortcodes/github.json");
    // const emojis_details = await axios.get("https://cdn.jsdelivr.net/npm/emojibase-data@latest/en/compact.json");
    // const emojis_groups = await axios.get("https://cdn.jsdelivr.net/npm/emojibase-data@latest/en/messages.json");
    const emoji_shortcodes_file_path = path.join("data", "emojibase_shortcodes.json");
    const emojis_details_file_path = path.join("data", "emojibase_details.json");
    const emojis_groups_file_path = path.join("data", "emojibase_groups.json");


    // try {
    //     fs.writeFileSync(emoji_shortcodes_file_path, JSON.stringify(emoji_shortcodes.data, null, 4));
    //     fs.writeFileSync(emojis_details_file_path, JSON.stringify(emojis_details.data, null, 4));
    //     fs.writeFileSync(emojis_groups_file_path, JSON.stringify(emojis_groups.data, null, 4));
    // } catch (err) {
    //     console.error(err);
    // }

    const emoji_shortcodes = JSON.parse(fs.readFileSync(emoji_shortcodes_file_path, 'utf-8'))
    const emojis_details = JSON.parse(fs.readFileSync(emojis_details_file_path, 'utf-8'))
    const github_emojis = JSON.parse(fs.readFileSync(file_path, 'utf-8'))

    var shortcodes = []

    emojis_details.forEach(emoji => {
        if(emoji['hexcode'] in emoji_shortcodes){
            shortcode_name = emoji_shortcodes[emoji['hexcode']]
            if(!Array.isArray(shortcode_name)){
                shortcode_name = [shortcode_name]
            }
            emoji["shortcode"] = shortcode_name
            shortcodes.push(emoji)
        }
    });

    shortcodes.push(github_emojis)


    const emoji_cons_file_path = path.join("data", "emoji_cons.json");

    try {
        fs.writeFileSync(emoji_cons_file_path, JSON.stringify(shortcodes, null, 4));
    } catch (err) {
        console.error(err);
    }

}

main();

