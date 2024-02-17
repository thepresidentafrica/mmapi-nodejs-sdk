/**
* MMAPI Node.js SDK dependency
*/
const mmapi = require('./lib/index');
/**
* Set up and return MMAPI Noe.js SDK environment.
*/
const consumerKey = process.env.CONSUMER_KEY
const consumerSecret = process.env.CONSUMER_SECRET;
const apiKey = process.env.API_KEY;
const securityOption = process.env.SECURITY_OPTION; // optional DEVELOPMENT_LEVEL, STANDARD_LEVEL, ENHANCED_LEVEL
const callbackUrl = process.env.CALLBACK_URL;
let environment;

if (process.env.NODE_ENV === 'production') {
  environment = new mmapi.core.LiveEnvironment(consumerKey, consumerSecret, apiKey, securityOption, callbackUrl);
}
console.log(process.env.NODE_ENV)
environment = new mmapi.core.SandboxEnvironment(consumerKey, consumerSecret, apiKey, securityOption, callbackUrl);

/**
* Returns MMAPI Node.js SDK HTTP client instance with environment.
* Use this instance to invoke MMAPI APIs
*/
let client = new mmapi.core.MobileMoneyApiHttpClient(environment);

console.log("Consumer Key : " + client.environment.consumerKey)
console.log("Consumer Secret : " + client.environment.consumerSecret)
console.log("API Key : " + client.environment.apiKey)
console.log("Environment : " + client.environment.environment)
console.log("Security Level : " + client.environment.securityOption)
console.log("Callback URL : " + client.environment.callbackUrl)
console.log("MMAPI URL : " + client.environment.baseUrl)
