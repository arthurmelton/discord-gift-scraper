var request = require("request");
var baseUrl = "https://discord.com/gifts/";
var verifyBaseUrl = "https://discordapp.com/api/v6/entitlements/gift-codes/";
var length = 24;
var times = 1000;
var rateLimit = 5000;
var allowedLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
function getString(length, allowedLetters, baseUrl) {
    var string = "";
    for(var i = 0; i < length; i++) {
        string = string + allowedLetters[Math.round(Math.random()*(allowedLetters.length -1))];
    }
    var url = baseUrl + string;
    return  url;
}
function validate(url, verifyBaseUrl, baseUrl) {
    var verifyUrl = verifyBaseUrl + url.replace(baseUrl, "");
    request(verifyUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonParsed = JSON.parse(body);
            if (jsonParsed.code) {
                if (jsonParsed.redeemed === false) {
                    console.log(url);
                }
            }
        }
    })
}
for(var i = 0; i < times; i++) {
    var waitTill = new Date(new Date().getTime() + i * rateLimit);
    while(waitTill > new Date()){}
    validate(getString(length, allowedLetters, baseUrl), verifyBaseUrl, baseUrl);
}