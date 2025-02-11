const {
  createAccount,
  createWithdrawalTransaction,
  createWithdrawalTransaction2,
  createAuthorisationCode,
  createDepositTransaction,
  createReversal,
  updateAccountIdentity,
  viewRequestState,
  viewTransaction,
  viewAuthorisationCode,
  viewAccountName,
  viewAccount,
  viewAccountBalance,
  viewAccountTransactions,
  viewServiceAvailability,
  viewResponse,
  viewResource
} = require('./index');

const usecase1 = async () => {
  console.log("Agent-initiated Cash-out using the Callback Method...");

  console.log("POST Agent Initiated Cash-Out")
  await createWithdrawalTransaction(true, true);
}

const usecase2 = async () => {
  console.log("Agent-initiated Cash-out using the Polling Method...");

  console.log("POST Agent Initiated Cash-Out")
  const { data: { serverCorrelationId } } = await createWithdrawalTransaction(undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET Retrieve a Transaction')
  await viewTransaction(objectReference, true);
}

const usecase3 = async () => {
  console.log("Customer-initiated Cash-out..");

  console.log("POST Customer Initiated Cash-Out")
  await createWithdrawalTransaction(true, true);
}

const usecase4 = async () => {
  console.log("Customer Cash - out at an ATM using an Authorisation Code..");

  console.log('POST Obtain an Authorisation Code')
  const { data: { serverCorrelationId } } = await createAuthorisationCode(undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET View an Authorisation Code')
  const { data: { authorisationCode } } = await viewAuthorisationCode(objectReference, true);

  console.log('POST ATM Initiated Cash-Out')
  await createWithdrawalTransaction2(authorisationCode, true, true);
}

const usecase5 = async () => {
  console.log("Agent-initiated Customer Cash-in..");

  console.log("GET Retrieve the Name of the Depositing Customer")
  await viewAccountName(true);

  console.log("POST Agent Initiated Cash-in")
  await createDepositTransaction(true, true);
}

const usecase6 = async () => {
  console.log("Cash-out Reversal...");

  console.log("POST Agent Initiated Cash-Out")
  const { data: { serverCorrelationId } } = await createWithdrawalTransaction(undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('POST Perform a Transaction Reversal')
  await createReversal(objectReference, true, true);
}

const usecase7 = async () => {
  console.log("Register a Customer Mobile Money Account...");

  var minm = parseInt('00000000');
  var maxm = parseInt('99999999');
  let msisdn = '+44' + Math.floor(Math.random() * (maxm - minm + 1)) + minm;

  console.log("POST Create a Mobile Money Account");
  const { data: { serverCorrelationId } } = await createAccount(msisdn, undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET View an Account')
  await viewAccount(objectReference.substr(7), true);
}

const usecase8 = async () => {
  console.log("Verify a Customer’s KYC...");

  var minm = parseInt('00000000');
  var maxm = parseInt('99999999');
  let msisdn = '+44' + Math.floor(Math.random() * (maxm - minm + 1)) + minm;

  console.log("POST Create a Mobile Money Account");
  const { data: { serverCorrelationId } } = await createAccount(msisdn, undefined, true);

  console.log('GET Poll to Determine the Request State')
  const { data: { objectReference } } = await viewRequestState(serverCorrelationId, true);

  console.log('GET View an Account')
  const { data: { identity } } = await viewAccount(objectReference.substr(7), true);

  console.log('PATCH Update KYC Verification Status')
  await updateAccountIdentity(msisdn, identity[0].identityId, true, true);
}

const usecase9 = async () => {
  console.log("Obtain an Agent Balance...")

  console.log('GET Get an Account Balance')
  await viewAccountBalance(true);
}

const usecase10 = async () => {
  console.log("Retrieve Transactions for an Agent...")

  console.log('GET Retrieve a Set of Transactions for an Account')
  await viewAccountTransactions(true);
}

const usecase11 = async () => {
  console.log("Check for Service Availability...")

  console.log('GET Check for Service Availability')
  await viewServiceAvailability(true);
}

const usecase12 = async () => {
  console.log("Retrieve a Missing API Response...")

  console.log("POST Agent Initiated Cash-Out")
  const { config: { headers } } = await createWithdrawalTransaction(undefined, true);

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
