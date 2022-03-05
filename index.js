const fs = require("fs");
const path = require("path");
const axios = require("axios");

const { fromHexcodeToCodepoint, fromCodepointToUnicode } = require("emojibase");

// import ifEmoji from "if-emoji";

// import * as config from "../config.json";

async function main() {
    // let emojis = [];
    const githubEmojis = await axios.get("https://api.github.com/emojis");
    const file_path = path.join("data", "github_emojis.json");

    var ghEmojiArr = Object.entries(githubEmojis.data);
    var emojis = {};
    ghEmojiArr.forEach((em) => {
        var hex = em[1]
            .split("?")[0]
            .split("/")
            .splice(-1)[0]
            .split(".")[0]
            .toUpperCase();

        var code = fromHexcodeToCodepoint(hex);
        if(!isNaN(code[0]))
            code = fromCodepointToUnicode(code);
        else
            code = hex
        emojis[em[0]] = code;
    });

    try {
        fs.writeFileSync(file_path, JSON.stringify(emojis, null, 4));
    } catch (err) {
        console.error(err);
    }
}

main();

// axios
//     .get("https://api.github.com/emojis")
//     .then(function (response) {
//         // handle success
//         var arr = Object.entries(response.data);
//         axios
//             .get("https://emoji-api.com/emojis?access_key=" + config.emoji_api)
//             .then((res) => {
//                 // console.log(res.data);
//                 // emojis = res.data
//                 arr.forEach((em) => {
//                     var hex = em[1]
//                         .split("?")[0]
//                         .split("/")
//                         .splice(-1)[0]
//                         .split(".")[0]
//                         .toUpperCase();
//                     var code = fromHexcodeToCodepoint(hex);
//                     // var code = em[1].split("?")[0].split("/").splice(-1)[0].split(".")[0].split("-").map(num => parseInt(num, 16)
//                     var dis =
//                         code == "NaN"
//                             ? '<img src="' + em[1] + '">'
//                             : code.map((num) => "&#" + num + ";").join("&zwj;");

//                     var data = res.data.find(
//                         (x) => x.codePoint === hex.split("-").join(" ")
//                     );
//                     // console.log(data);
//                     if (data) {
//                         data.image = em[1];
//                         data.shortcode = em[0];
//                     } else {
//                         data = {
//                             display:
//                                 code == "NaN"
//                                     ? '<img src="' + em[1] + '">'
//                                     : code
//                                           .map((num) => "&#" + num + ";")
//                                           .join("&zwj;"),
//                             image: em[1],
//                             shortcode: em[0],
//                         };
//                     }

//                     emojis.push(data);
//                     // console.log(hex.split("-").join(" "));
//                 });
//                 emojis = emojis;
//             });
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     });
