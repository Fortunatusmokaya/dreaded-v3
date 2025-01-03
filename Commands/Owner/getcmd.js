module.exports = async (context) => {

const ownerMiddleware = require('../../Middleware/ownerMiddleware'); 

const fs = require('fs');
    await ownerMiddleware(context, async () => {
        const { client, m, text, Owner, prefix } = context;

        if (!text) return m.reply(`Provide name of command to fetch it's code. Like, ${prefix}getcmd fullpp`);

        const categories = [
            { name: 'AI' },
            { name: 'General' },
            { name: 'Media' },
            { name: 'Editting' },
            { name: 'Groups' },
            { name: 'Owner' },
{ name: 'Settings' },
{ name: 'Random' },
{ name: 'Wa-Privacy' },
{ name: 'Search' },
            { name: 'Coding' }
        ];

        let fileFound = false;

        const promises = categories.map((category) => {
            const fileName = text
            const filePath = `./Commands/${category.name}/${fileName.endsWith('.js') ? fileName : `${fileName}.js`}`;

            return new Promise((resolve, reject) => {
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                       
                        resolve(false);
                    } else {
                       
                        fs.readFile(filePath, 'utf8', (err, data) => {
                            if (err) {
                                m.reply(`Error reading file:-\n ${err.message}`);
                                resolve(false);
                            } else {
                                m.reply(`//${text}.js\n\n${data}`);
                                fileFound = true; 
                                resolve(true);
                            }
                        });
                    }
                });
            });
        });

        await Promise.all(promises);

        if (!fileFound) {
            m.reply(`Command not found: ${text}`);
        }
    });
};