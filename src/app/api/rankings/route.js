import { connectToDb, executeQuery } from "@app/_lib/db";

export async function GET(request) {
  try {
    await connectToDb("PS_GameData");
    await connectToDb("PS_UserData");

    const rankingsQuery = `
      SELECT
        chars.CharID AS ID,
        chars.CharName AS Name,
        chars.Family,
        chars.Job,
        chars.Sex,
        chars.HP,
        chars.MP,
        chars.SP,
        chars.Map,
        chars.Money,
        chars.Level,
        chars.K1 AS Kills,
        chars.RegDate AS DateCreated,
        chars.LoginStatus,
        guilds.GuildName,
        guilds.GuildPoint
      FROM PS_GameData.dbo.Chars AS chars
      INNER JOIN PS_UserData.dbo.Users_Master AS users
        ON chars.UserUID = users.UserUID
      LEFT JOIN PS_GameData.dbo.GuildChars AS guildChars
        ON chars.CharID = guildChars.CharID
      LEFT JOIN PS_GameData.dbo.Guilds AS guilds
        ON guildChars.GuildID = guilds.GuildID
      WHERE users.Admin = 0 AND chars.Del = 0
    `;

    const rankingsData = await executeQuery(rankingsQuery);

    const sortedData = rankingsData.sort((a, b) => b.Kills - a.Kills);

    return new Response(JSON.stringify(sortedData), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch data.", details: err.message }), {
      status: 500,
    });
  }
}