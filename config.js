const session = process.env.SESSION || '';
const mongoURI = process.env.MONGO_URI || '';
const mycode = process.env.CODE || '263';
const botname = process.env.BOTNAME || 'DREADED-V3';

module.exports = {
  session,
  mongoURI,
  mycode,
  botname
}; 
