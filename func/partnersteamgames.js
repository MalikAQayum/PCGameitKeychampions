function partnersteamgames(i,APIKey,cdkey,appid,steamid)
{
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://partner.steamgames.com/querycdkey/cdkey?cdkey="+cdkey+"&method=Query",
        onload: function(response) {
            var querycdkey = response.responseText;
			querycdkey = querycdkey.split('<h2>Activation Details</h2>')[1].split('</table>')[0].split('</tr>')[1].split('</td>');

			var querycdkeystate = querycdkey[0].match(/(?<=">).*(?=<\/)/);
            var querycdkeydate = querycdkey[1].replace("<td>","").trim();
            var querycdkeypackage = querycdkey[2].match(/(?<= >).*(?=<\/)/);
            var querycdkeybatch = querycdkey[3].replace("<td>","").trim();

            if(querycdkeystate[0] === "Activated") 
			{
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "https://api.steampowered.com/ISteamUser/CheckAppOwnership/v2/"+"?key="+APIKey+"&steamid="+steamid+"&appid="+appid,
                    onload: function(response) {
                        var appownershipJSON = JSON.parse(response.responseText);
                        var CheckAppOwnershipDate = new Date(appownershipJSON['appownership']['timestamp']);
                        CheckAppOwnershipDate = CheckAppOwnershipDate.toISOString();
                        var querycdkeyDate = new Date(querycdkeydate);
                        querycdkeyDate = querycdkeyDate.toISOString();

						if(CheckAppOwnershipDate === querycdkeyDate)
						{
							if(appownershipJSON['appownership']['ownersteamid'] === steamid)
							{
								g_KeyDataSimplified.push('"' + i + '":{"State": "0","PCGameitID": "' + steamid + '","cdkey":"' +cdkey+ '"}');
								g_KeyDataDetailed.push('"' + i +'":{"State": "0","PCGameitID": "' + steamid +'","querycdkeyDate": "' + querycdkeyDate +'","CheckAppOwnershipID": "' + appownershipJSON['appownership']['ownersteamid'] +'","CheckAppOwnershipDate": "' + CheckAppOwnershipDate +'","querycdkeystate": "' + querycdkeystate +'","cdkey":"' +cdkey+'","querycdkeypackage": "' + querycdkeypackage +'","querycdkeybatch": "' + querycdkeybatch +'"}');
							}
							else
							{
								g_KeyDataSimplified.push('"' + i + '":{"State": "1","PCGameitID": "' + steamid + '","cdkey":"' +cdkey+ '"}');
								g_KeyDataDetailed.push('"' + i +'":{"State": "1","PCGameitID": "' + steamid +'","querycdkeyDate": "' + querycdkeyDate +'","CheckAppOwnershipID": "' + appownershipJSON['appownership']['ownersteamid'] +'","CheckAppOwnershipDate": "' + CheckAppOwnershipDate +'","querycdkeystate": "' + querycdkeystate +'","cdkey":"' +cdkey+'","querycdkeypackage": "' + querycdkeypackage +'","querycdkeybatch": "' + querycdkeybatch +'"}');
							}
						}
						else if(CheckAppOwnershipDate > querycdkeyDate)
						{
							if(appownershipJSON['appownership']['ownersteamid'] === steamid)
							{
								g_KeyDataSimplified.push('"' + i + '":{"State": "0","PCGameitID": "' + steamid + '","cdkey":"' +cdkey+ '"}');
								g_KeyDataDetailed.push('"' + i +'":{"State": "0","PCGameitID": "' + steamid +'","querycdkeyDate": "' + querycdkeyDate +'","CheckAppOwnershipID": "' + appownershipJSON['appownership']['ownersteamid'] +'","CheckAppOwnershipDate": "' + CheckAppOwnershipDate +'","querycdkeystate": "' + querycdkeystate +'","cdkey":"' +cdkey+'","querycdkeypackage": "' + querycdkeypackage +'","querycdkeybatch": "' + querycdkeybatch +'"}');
							}
							else
							{
								g_KeyDataSimplified.push('"' + i + '":{"State": "1","PCGameitID": "' + steamid + '","cdkey":"' +cdkey+ '"}');
								g_KeyDataDetailed.push('"' + i +'":{"State": "1","PCGameitID": "' + steamid +'","querycdkeyDate": "' + querycdkeyDate +'","CheckAppOwnershipID": "' + appownershipJSON['appownership']['ownersteamid'] +'","CheckAppOwnershipDate": "' + CheckAppOwnershipDate +'","querycdkeystate": "' + querycdkeystate +'","cdkey":"' +cdkey+'","querycdkeypackage": "' + querycdkeypackage +'","querycdkeybatch": "' + querycdkeybatch +'"}');
							}
						}
						else if(CheckAppOwnershipDate < querycdkeyDate)
						{
							if(appownershipJSON['appownership']['ownersteamid'] === steamid)
							{
								g_KeyDataSimplified.push('"' + i + '":{"State": "1","PCGameitID": "' + steamid + '","cdkey":"' +cdkey+ '"}');
								g_KeyDataDetailed.push('"' + i +'":{"State": "1","PCGameitID": "' + steamid +'","querycdkeyDate": "' + querycdkeyDate +'","CheckAppOwnershipID": "' + appownershipJSON['appownership']['ownersteamid'] +'","CheckAppOwnershipDate": "' + CheckAppOwnershipDate +'","querycdkeystate": "' + querycdkeystate +'","cdkey":"' +cdkey+'","querycdkeypackage": "' + querycdkeypackage +'","querycdkeybatch": "' + querycdkeybatch +'"}');
							}
							else
							{
								g_KeyDataSimplified.push('"' + i + '":{"State": "1","PCGameitID": "' + steamid + '","cdkey":"' +cdkey+ '"}');
								g_KeyDataDetailed.push('"' + i +'":{"State": "1","PCGameitID": "' + steamid +'","querycdkeyDate": "' + querycdkeyDate +'","CheckAppOwnershipID": "' + appownershipJSON['appownership']['ownersteamid'] +'","CheckAppOwnershipDate": "' + CheckAppOwnershipDate +'","querycdkeystate": "' + querycdkeystate +'","cdkey":"' +cdkey+'","querycdkeypackage": "' + querycdkeypackage +'","querycdkeybatch": "' + querycdkeybatch +'"}');
							}
						}
						else
						{
							//do nothing.
						}
                    }
                });
            }
            else
            {
				g_KeyDataSimplified.push('"' + i + '":{"State": "2","PCGameitID": "' + steamid + '","cdkey":"' +cdkey+ '"}');
				g_KeyDataDetailed.push('"' + i +'":{"State": "2","PCGameitID": "' + steamid +'","querycdkeyDate": "","CheckAppOwnershipID": "","CheckAppOwnershipDate": "","querycdkeystate": "' + querycdkeystate +'","cdkey":"' +cdkey+'","querycdkeypackage": "' + querycdkeypackage +'","querycdkeybatch": "' + querycdkeybatch +'"}');

            }
        }
    });
}