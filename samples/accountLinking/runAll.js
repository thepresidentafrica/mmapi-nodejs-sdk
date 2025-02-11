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
} = require('./index');

const usecase1 = async () => {
  console.log("Setup an Account Link...");

  console.log("POST Establish an Account to Account Link")
  await createAccountLink(true, true);
}

const usecase2 = async () => {
  console.log("Perform a Transfer for a Linked Account...");

  console.log("POST Establish an Account to Account Link");
  const { data: { serverCorrelationId } } = await createAccountLink(undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET View A Link');
  const { data: { linkReference } } = await viewAccountLink(objectReference, true);

  console.log("POST Use a Link to make a Transfer");
  await createTransferTransaction(linkReference, true, true);
}

const usecase3 = async () => {
  console.log("Perform a Transfer using an Account Link via the Polling Method...");

  console.log("POST Establish an Account to Account Link");
  const { data: { serverCorrelationId } } = await createAccountLink(undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET View A Link');
  const { data: { linkReference } } = await viewAccountLink(objectReference, true);

  console.log('POST Use a Link to make a Transfer')
  const { data: { serverCorrelationId: serverCorrelationId2 } } = await createTransferTransaction(linkReference, undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference: objectReference2 } } = await viewRequestState(serverCorrelationId2, true);

  console.log('GET Retrieve a Transaction')
  await viewTransaction(objectReference2, true);
}

const usecase4 = async () => {
  console.log("Perform a Transfer Reversal...")

  console.log("POST Establish an Account to Account Link");
  const { data: { serverCorrelationId } } = await createAccountLink(undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET View A Link');
  const { data: { linkReference } } = await viewAccountLink(objectReference, true);

  console.log("POST Use a Link to make a Transfer");
  const { data: { serverCorrelationId: serverCorrelationId2 } } = await createTransferTransaction(linkReference, undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference: objectReference2 } } = await viewRequestState(serverCorrelationId2, true);

  console.log('POST Perform a Transaction Reversal')
  await createReversal(objectReference2, true, true);
}

const usecase5 = async () => {
  console.log("Obtain a Financial Service Provider Balance...")

  console.log('GET Get an Account Balance')
  await viewAccountBalance(true);
}

const usecase6 = async () => {
  console.log("Retrieve Transfers for a Financial Service Provider...")

  console.log('GET Retrieve a Set of Transactions for an Account')
  await viewAccountTransactions(true);
}

const usecase7 = async () => {
  console.log("Check for Service Availability...")

  console.log('GET Check for Service Availability')
  await viewServiceAvailability(true);
}

const usecase8 = async () => {
  console.log("Retrieve a Missing API Response...")

  console.log("POST Establish an Account to Account Link");
  const { config: { headers } } = await createAccountLink(true, true);

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
    default:
      await usecase1();
      await usecase2();
      await usecase3();
      await usecase4();
      await usecase5();
      await usecase6();
      await usecase7();
      await usecase8();
  }
})();