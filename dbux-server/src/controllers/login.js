
import '@dbux/common/src/util/prettyLogs';
import { fetchGET } from '@dbux/projects/src/util/fetch';
import { newLogger } from '@dbux/common/src/log/logger';
import { firebase } from '../db';

// eslint-disable-next-line no-unused-vars
const { log, debug, warn, error: logError } = newLogger('dbux-server');

async function createToken(userId) {
  try {
    let token = await firebase.auth().createCustomToken(userId);
    return token;
  }
  catch (err) {
    throw new Error(`Error when creating custom token: ${err.message}`);
  }
}

export async function verify(request, response) {
  let token = request.query.githubAccessToken;

  try {
    const result = await fetchGET('https://api.github.com/user', null, { headers: { Authorization: `token ${token}` } });
    const newToken = await createToken(token);
    response.send(newToken);
  } 
  catch (err) {
    response.status(400).send(`<pre>Failed with error: ${err.stack}</pre>`);
  }
}