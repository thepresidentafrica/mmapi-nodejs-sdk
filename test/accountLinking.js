const {
  viewAccountBalance,
  viewServiceAvailability,
  viewResponse,
  viewResource,
  createAccountLink,
  createTransferTransaction,
  viewRequestState,
  viewTransaction,
  createReversal,
  viewAccountTransactions,
  viewAccountLink
} = require('../samples/index');

const buildAccountLinkRequestBody = () => ({
  "sourceAccountIdentifiers": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ],
  "status": "active",
  "mode": "both",
  "customData": [
    {
      "key": "keytest",
      "value": "keyvalue"
    }
  ],
  "requestingOrganisation": {
    "requestingOrganisationIdentifierType": "organisationid",
    "requestingOrganisationIdentifier": "12345"
  }
});

const buildTransferTransactionRequestBody = (linkReference) => ({
  "amount": "200.00",
  "creditParty": [
    {
      "key": "linkref",
      "value": `${linkReference}`
    }
  ],
  "currency": "RWF",
  "debitParty": [
    {
      "key": "accountid",
      "value": "2999"
    }
  ]
});

const usecase1 = async () => {
  console.log("Setup an Account Link...");

  console.log("POST Establish an Account to Account Link")
  await createAccountLink(buildAccountLinkRequestBody(), 'accountid', '2000', 'accountLinking', undefined, true);
}

const usecase2 = async () => {
  console.log("Setup an Account Link using the Polling Method...");

  console.log("POST Establish an Account to Account Link");
  const { data: { serverCorrelationId } } = await createAccountLink(buildAccountLinkRequestBody(), 'accountid', '2000', 'accountLinking', true, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, 'accountLinking', true);

  console.log('GET View A Link');
  await viewAccountLink('accountid', '2000', objectReference, 'accountLinking', true);
}

const usecase3 = async () => {
  console.log("Perform a Transfer for a Linked Account...");

  console.log("POST Use a Link to make a Transfer");
  await createTransferTransaction(buildTransferTransactionRequestBody('REF-1638280960220'), 'accountLinking', undefined, true);
}

const usecase4 = async () => {
  console.log("Perform a Transfer using an Account Link via the Polling Method...");

  console.log('POST Use a Link to make a Transfer')
  const { data: { serverCorrelationId } } = await createTransferTransaction(buildTransferTransactionRequestBody('REF-1638280960220'), 'accountLinking', true, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, 'accountLinking', true);

  console.log('GET Retrieve a Transaction')
  await viewTransaction(objectReference, 'accountLinking', true);
}

const usecase5 = async () => {
  console.log("Perform a Transfer Reversal...")

  console.log("POST Use a Link to make a Transfer");
  const { data: { serverCorrelationId } } = await createTransferTransaction(buildTransferTransactionRequestBody('REF-1638280960220'), 'accountLinking', undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, 'accountLinking', true);

  console.log('POST Perform a Transaction Reversal')
  await createReversal(objectReference, 'accountLinking', true);
}

const usecase6 = async () => {
  console.log("Obtain a Financial Service Provider Balance...")

  console.log('GET Get an Account Balance')
  await viewAccountBalance('accountid', '2000', 'accountLinking', true);
}

const usecase7 = async () => {
  console.log("Retrieve Transfers for a Financial Service Provider...")

  console.log('GET Retrieve a Set of Transactions for an Account')
  await viewAccountTransactions('accountid', '2000', 0, 2, 'accountLinking', true);
}

const usecase8 = async () => {
  console.log("Check for Service Availability...")

  console.log('GET Check for Service Availability')
  await viewServiceAvailability('accountLinking', true);
}

const usecase9 = async () => {
  console.log("Retrieve a Missing API Response...")

  console.log("POST Establish an Account to Account Link");
  const { config: { headers } } = await createAccountLink(buildAccountLinkRequestBody(), 'accountid', '2000', 'accountLinking', undefined, true);

  console.log('GET Retrieve a Missing Response');
  const { data: { link } } = await viewResponse(headers['X-CorrelationID'], 'accountLinking', true);

  console.log('GET Retrieve a Missing Resource');
  await viewResource(link, 'accountLinking', true);
}

(async (usecase) => {
  switch (usecase) {
    case 1:
      await usecase1();
      break;
    case 2:
      await usecase2();
      break;
    case 3:
      await usecase3();
      break;
    case 4:
      await usecase4();
      break;
    case 5:
      await usecase5();
      break;
    case 6:
      await usecase6();
      break;
    case 7:
      await usecase7();
      break;
    case 8:
      await usecase8();
      break;
    case 9:
      await usecase9();
      break;
    default:
      await usecase1();
      await usecase2();
      await usecase3();
      await usecase4();
      await usecase5();
      await usecase6();
      await usecase7();
      await usecase8();
      await usecase9();
  }
})(1);