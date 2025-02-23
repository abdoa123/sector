const AWS = require('aws-sdk');
require('dotenv').config();
const dotenv = require('dotenv');

const secretsManager = new AWS.SecretsManager();

async function getSecretValue() {
  const data = await secretsManager.getSecretValue({ SecretId: 'test_secrets' }).promise();
  const secrets = JSON.parse(data.SecretString);

  // Loop through the secrets and add them to dotenv
  Object.keys(secrets).forEach((key) => {
    
    process.env[key] = secrets[key];
    console.log(secrets[key]);
    dotenv.config({ path: '.env' });
  });
}

module.exports = { getSecretValue };