# mmapi-nodejs-sdk

## Initialize Client

```javascript
const mmapi = require('mmapi-nodejs-sdk');

// Creating an environment
let consumerKey = "<<MOBILE_MONEY_API_CONSUMER_KEY>>";
let consumerSecret = "<<MOBILE_MONEY_API_API_CONSUMER_SERCRET>>";
let apiKey = "<<MOBILE_MONEY_API_API_KEY>>"
let securityOption = "<<DEVELOPMENT_LEVEL || STANDARD_LEVEL || ENHANCED_LEVEL>>" // optional

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new mmapi.core.SandboxEnvironment(consumerKey, consumerSecret, apiKey);
let client = new mmapi.core.MobileMoneyApiHttpClient(environment);
```

| Usecase     | Method     | API           |
| ------------- | ------------- | ------------- |
| Merchant Payments | POST |[Payee Initiated Merchant Payment](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/doc/merchantPayment/performAMerchantPaymentRequest.Readme.md)|
| Merchant Payments | GET |[Poll to Determine the Request State](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/doc/merchantPayment/pollToDetermineTheRequestStateRequest.Readme.md)|
| Merchant Payments | GET |[Retrieve a Transaction](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/doc/merchantPayment/retrieveATransactionRequest.Readme.md)|
| Merchant Payments | POST |[Payer Initiated Merchant Payment](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-authentication/doc/merchantPayment/performAMerchantPaymentRequest.Readme.md)|
| Disbursements | POST |[Perform an Individual Disbursement](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-bulk-disbursement/doc/disbursement/performAnIndividualDisbursement.Readme.md)|
| Disbursements | POST |[Perform a Bulk Disbursement](https://github.com/gsmainclusivetechlab/mmapi-nodejs-sdk/blob/feature-bulk-disbursement/doc/disbursement/performABulkDisbursement.Readme.md)|
