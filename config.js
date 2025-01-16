const session = process.env.SESSION || '';
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://kaizer:kaizer@cluster0.v0nls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const mycode = process.env.CODE || '254';
const botname = process.env.BOTNAME || 'DREADED';
const herokuAppName = process.env.HEROKU_APP_NAME || '';
const herokuApiKey = process.env.HEROKU_API_KEY || '';

module.exports = {
  session,
  mongoURI,
  mycode,
  botname,
  herokuAppName,
  herokuApiKey,
};
