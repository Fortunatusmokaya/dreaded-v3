module.exports = async (context) => {
    const { client, m, text, mime, uploadtoimgur, fetchJson } = context;

    try {
        const cap = "By Dreaded-v3";


        if (!m.quoted) return m.reply("Send the image then tag it with the command.");
        if (!/image/.test(mime)) return m.reply("That is not an image, try again while quoting an actual image.");

        let fdr = await client.downloadAndSaveMediaMessage(m.quoted);

        let fta = await uploadtoimgur(fdr);
        m.reply("A moment, dreaded is erasing the background...");

        
        const response = await fetchJson(`https://api.dreaded.site/api/removebg?imageurl=${fta}`);

        if (response.success && response.imageBase64) {
            const base64Image = response.imageBase64.split(",")[1]; 
            const buffer = Buffer.from(base64Image, 'base64'); 

            await client.sendMessage(m.chat, { image: buffer, caption: cap }, { quoted: m });
        } else {
            m.reply("Failed to remove background.");
        }

    } catch (error) {
        m.reply("An error occurred...");
    }
};