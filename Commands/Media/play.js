module.exports = async (context) => {
    const { client, m, text, fetchJson } = context;
    const yts = require("yt-search");

    try {
        if (!text) return m.reply("What song do you want to download?");

        const { videos } = await yts(text);
        if (!videos || videos.length === 0) {
            return m.reply("No songs found!");
        }

        const urlYt = videos[0].url;

        try {
            
            let data = await fetchJson(`https://api.dreaded.site/api/ytdl2/audio?url=${urlYt}`);
            if (!data || !data.result || !data.result.downloadUrl) {
                throw new Error("Invalid response from primary API");
            }

            const { title: name, downloadUrl: audio } = data.result;

            await m.reply(`_Downloading ${name}_`);
            await client.sendMessage(
                m.chat,
                {
                    document: { url: audio },
                    mimetype: "audio/mpeg",
                    fileName: `${name}.mp3`,
                },
                { quoted: m }
            );
        } catch (primaryError) {
            console.error("Primary API failed:", primaryError.message);

          
            try {
                let fallbackData = await fetchJson(`https://api.dreaded.site/api/ytdl/audio?url=${urlYt}`);
                if (!fallbackData || !fallbackData.title || !fallbackData.audioUrl) {
                    throw new Error("Invalid response from fallback API");
                }

                const { title: name, audioUrl: audio } = fallbackData;

                await m.reply(`_Downloading ${name}_`);
                await client.sendMessage(
                    m.chat,
                    {
                        document: { url: audio },
                        mimetype: "audio/mpeg",
                        fileName: `${name}.mp3`,
                    },
                    { quoted: m }
                );
            } catch (fallbackError) {
                console.error("Fallback API failed:", fallbackError.message);
                m.reply("Download failed: Unable to retrieve audio from both APIs.");
            }
        }
    } catch (error) {
        m.reply("Download failed\n" + error.message);
    }
};