function CheckKey(i, ms_delay, ObjectKeyLength, json, appid, APIKey)
{
    partnersteamgames(i,APIKey,json[i]["_Key"],appid,json[i].SteamID);
    if (i < ObjectKeyLength -1){
        i++;
        setTimeout(()=>{
            CheckKey(i, ms_delay, ObjectKeyLength, json, appid, APIKey);
        }, ms_delay);
    } else {
        setTimeout(()=>{
            console.log('We are all done, make sure to save the console outputs.');
            console.log("g_KeyDataSimplified =>");
            console.log("{" + g_KeyDataSimplified+ "}");
            console.log("g_KeyDataDetailed =>");
            console.log("{" + g_KeyDataDetailed+ "}");
        }, /*ms_delay*/ 3000);
    }
}