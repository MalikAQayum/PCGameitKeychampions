// ==UserScript==
// @name         PCGameit Keychampions.
// @namespace    http://pcgameit.com/Keychampions/
// @version      1.0
// @description  Script for developers / publishers to see decide whether or not a steam key should be revoked.
// @author       MalikQayum
// @connect      api.steampowered.com
// @connect      partner.steam-api.com
// @connect      partner.steamgames.com
// @connect      store.steampowered.com
// @connect      steamcommunity.com
// @connect      pcgameit.com
// @match        https://partner.steamgames.com/querycdkey/*
// @require     https://raw.githubusercontent.com/MalikAQayum/PCGameitKeychampions/master/func/CheckKey.js
// @require     https://raw.githubusercontent.com/MalikAQayum/PCGameitKeychampions/master/func/partnersteamgames.js
// @require     https://raw.githubusercontent.com/MalikAQayum/PCGameitKeychampions/master/func/isJson.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

/* Uncomment below const when you have added/replaced it with your credentials.
** APIKey with your publisher WebAPI key.
** The appid with your appid.
** The giveawayid (gid) with your gid.
*/

//const APIKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", appid = "583950", gid = "58395014993";

var g_KeyDataDetailed = [];
var g_KeyDataSimplified = [];

GM_xmlhttpRequest({
    method: "GET",
    url: "https://www.pcgameit.com/keychampions/api/getkeys.php?gid="+gid,
    onload: function(response) {
        var res = response.responseText;
        if(isJson(res))
        {
            var json = JSON.parse(res);
            CheckKey(0, 1000, Object.keys(json).length, json, appid, APIKey);
        }
        else
        {
            console.log(res);
        }
    }
});
