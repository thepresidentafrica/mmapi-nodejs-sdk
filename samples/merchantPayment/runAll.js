const {
  viewAccountBalance,
  viewServiceAvailability,
  viewResponse,
  viewResource,
  createMerchantTransaction,
  createMerchantTransaction2,
  viewRequestState,
  viewTransaction,
  createAuthorisationCode,
  createRefundTransaction,
  createReversal,
  viewAccountTransactions,
  viewAuthorisationCode
} = require('./index');

const usecase1 = async () => {
  console.log("Perform a Payee-Initiated Merchant Payment...");

  console.log("POST Payee Initiated Merchant Payment")
  await createMerchantTransaction(true, true);
}

const usecase2 = async () => {
  console.log("Perform a Payee-Initiated Merchant Payment via the Polling Method...")

  console.log('POST Payee Initiated Merchant Payment')
  const { data: { serverCorrelationId } } = await createMerchantTransaction(undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET Retrieve a Transaction')
  await viewTransaction(objectReference, true);
}

const usecase3 = async () => {
  console.log("Perform a Payer-Initiated Merchant Payment...")

  console.log('POST Payer Initiated Merchant Payment')
  await createMerchantTransaction(true, true);
}

const usecase4 = async () => {
  console.log("Perform a Payee-Initiated Merchant Payment using a Pre-authorised Payment Code...")

  console.log('POST Obtain an Authorisation Code')
  await createAuthorisationCode(true, true);
}

const usecase5 = async () => {
  console.log("Perform a Payee-Initiated Merchant Payment using a Pre-authorised Payment Code Using the Polling Method...")

  console.log('POST Obtain an Authorisation Code')
  const { data: { serverCorrelationId } } = await createAuthorisationCode(undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET View an Authorisation Code')
  const { data: { authorisationCode } } = await viewAuthorisationCode(objectReference, true);

  console.log("POST Perform a Merchant Payment")
  await createMerchantTransaction2(authorisationCode, true, true);
}

const usecase6 = async () => {
  console.log("Perform a Merchant Payment Refund...")

  console.log('POST Perform a Merchant Payment Refund')
  await createRefundTransaction(true, true);
}

const usecase7 = async () => {
  console.log("Perform a Merchant Payment Refund Using the Polling Method...")

  console.log('POST Perform a Merchant Payment Refund')
  const { data: { serverCorrelationId } } = await createRefundTransaction(undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET Retrieve a Transaction')
  await viewTransaction(objectReference, true);
}

const usecase8 = async () => {
  console.log("Perform a Merchant Payment Reversal...")

  console.log('POST Payee Initiated Merchant Payment')
  const { data: { serverCorrelationId } } = await createMerchantTransaction(undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('POST Perform a Merchant Payment Reversal')
  await createReversal(objectReference, true, true);
}

const usecase9 = async () => {
  console.log("Obtain a Merchant Balance...")

  console.log('GET Get an Account Balance')
  await viewAccountBalance(true);
}

const usecase10 = async () => {
  console.log("Retrieve Payments for a Merchant...")

  console.log('GET Retrieve a Set of Transactions for an Account')
  await viewAccountTransactions(true);
}

const usecase11 = async () => {
  console.log("Check for API Provider Service Availability...")

  console.log('GET Check for Service Availability')
  await viewServiceAvailability(true);
}

const usecase12 = async () => {
  console.log("Retrieve a Missing API Response from an API Provider...")

  console.log('POST Payee Initiated Merchant Payment');
  const { config: { headers } } = await createMerchantTransaction(true, true);

  console.log('GET Retrieve a Missing Response');
  const { data: { link } } = await viewResponse(headers['X-CorrelationID'], true);

  console.log('GET Retrieve a Missing Resource');
  await viewResource(link, true);
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
    case 10:
      await usecase10();
      break;
    case 11:
      await usecase11();
      break;
    case 12:
      await usecase12();
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
      await usecase10();
      await usecase11();
      await usecase12();
  }
})();
