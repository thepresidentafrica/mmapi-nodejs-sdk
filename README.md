# mmapi-nodejs-sdk

The MMAPI SDK for Node.js enables Node.js developers to easily work with [GSMA Mobile Money API Specification 1.2.0](https://developer.mobilemoneyapi.io/1.2).

The SDK provides separate use cases to handle necessary MMAPI functionality including Merchant Payments, Disbursements, International Transfers, P2P Transfers, Recurring Payments, Account Linking, Bill Payments and Agent Services (including Cash-In and Cash-Out). Each use case exposes use case scenarios
to customize your application integrations as needed. The SDK also includes a Samples, so you can test interactions before integration.

## Index

This document contains the following sections:

-  [Requirements](#requirements)
-  [Getting Started](#getting-started)
-  [Setting Up](#setting-up)
-  [Use Cases](#use-cases)
    * [Merchant Payments](#merchant-payments)
    * [Disbursements](#disbursements)
    * [International Transfers](#international-transfers)
    * [P2P Transfers](#p2p-transfers)
    * [Recurring Payments](#recurring-payments)
    * [Account Linking](#account-linking)
    * [Bill Payments](#bill-payments)
    * [Agent Services (including Cash-In and Cash-Out)](#agent-services)
-   [Tests](#tests)
    *   [Unit Test](#unit-test)
    *   [Integration Test](#integration-test)
-  [Samples](#samples)

## Requirements

-  Node.js 16.13.1 LTS or higher

## Getting Started

Create a Node.js project in your directory, then run the following command to install the Mobile Money Api Node.js SDK.

```javascript
npm install mmapi-nodejs-sdk
```

## Setting Up
After you install the SDK, make it available to your app and configure your environment. 
Configuration details include either sandbox for testing or live for production, and your consumer key, consumer secret, api key, security option  and callback url for your app.

In the directory where you installed the SDK,  include this code to make the SDK available and configure your environment with your application credentials for sandbox and live environments in the Developer Dashboard.

```javascript
/**
 * MMAPI Node.js SDK dependency
*/
const mmapi = require('mmapi-nodejs-sdk');

/**
  * Set up and return MMAPI Noe.js SDK environment.
*/
const consumerKey = process.env.CONSUMER_KEY
const consumerSecret = process.env.CONSUMER_SECRET;
const apiKey = process.env.API_KEY;
const securityOption = process.env.SECURITY_OPTION; // DEVELOPMENT_LEVEL, STANDARD_LEVEL, ENHANCED_LEVEL
const callbackUrl = process.env.CALLBACK_URL;

let environment;

if (process.env.NODE_ENV === 'production') {
  environment = new mmapi.core.LiveEnvironment(consumerKey, consumerSecret, apiKey, securityOption, callbackUrl);
}

environment = new mmapi.core.SandboxEnvironment(consumerKey, consumerSecret, apiKey, securityOption, callbackUrl);

/**
  * Returns MMAPI Noe.js SDK HTTP client instance with environment.
  * Use this instance to invoke MMAPI APIs
*/
let client = new mmapi.core.MobileMoneyApiHttpClient(environment);
```

## Use Cases

### Merchant Payments
<table>
<thead>
  <tr>
    <th>Scenarios</th>
    <th>API</th>
    <th>Function</th>
    <th>Parameters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Payee-Initiated Merchant Payment</td>
    <td><a href="/docs/merchantPayment/createMerchantTransaction.Readme.md">Payee Initiated Merchant Payment</a></td>
    <td>createMerchantTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="3">Payee-Initiated Merchant Payment using the Polling Method</td>
    <td><a href="/docs/merchantPayment/createMerchantTransaction.Readme.md">Payee Initiated Merchant Payment</a></td>
    <td>createMerchantTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/merchantPayment/viewRequestState.Readme.md">Poll to Determine the Request State</a></td>
    <td>viewRequestState</td>
    <td>serverCorrelationId</td>
  </tr>
  <tr>
    <td><a href="/docs/merchantPayment/viewTransaction.Readme.md">Retrieve a Transaction</a></td>
    <td>viewTransaction</td>
    <td>transactionReference</td>
  </tr>
  <tr>
    <td>Payer-Initiated Merchant Payment</td>
    <td><a href="/docs/merchantPayment/createMerchantTransaction.Readme.md">Payer Initiated Merchant Payment</a></td>
    <td>createMerchantTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="3">Payee-Initiated Merchant Payment using a Pre-authorised Payment Code</td>
    <td><a href="/docs/merchantPayment/createAuthorisationCode.Readme.md">Obtain an Authorisation Code</a></td>
    <td>createAuthorisationCode</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td><a href="/docs/merchantPayment/createMerchantTransaction.Readme.md">Perform a Merchant Payment</a></td>
    <td>createMerchantTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/merchantPayment/viewAuthorisationCode.Readme.md">View An Authorisation Code</a></td>
    <td>viewAuthorisationCode</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td>Merchant Payment Refund</td>
    <td><a href="/docs/merchantPayment/createRefundTransaction.Readme.md">Perform a Merchant Payment Refund</a></td>
    <td>createRefundTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td>Merchant Payment Reversal</td>
    <td><a href="/docs/merchantPayment/createReversal.Readme.md">Perform a Merchant Payment Reversal</a></td>
    <td>createReversal</td>
    <td>originalTransactionReference</td>
  </tr>
  <tr>
    <td>Obtain a Merchant Balance</td>
    <td><a href="docs/merchantPayment/viewAccountBalance.Readme.md">Get an Account Balance</a></td>
    <td>viewAccountBalance</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td>Retrieve Payments for a Merchant</td>
    <td><a href="/docs/merchantPayment/viewAccountTransactions.Readme.md">Retrieve a Set of Transactions for an Account</a></td>
    <td>viewAccountTransactions</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td>Check for Service Availability</td>
    <td><a href="/docs/merchantPayment/viewServiceAvailability.Readme.md">Check for Service Availability</a></td>
    <td>viewServiceAvailability</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Retrieve a Missing API Response</td>
    <td><a href="/docs/merchantPayment/viewResponse.Readme.md">Retrieve a Missing Response</a></td>
    <td>viewResponse</td>
    <td>clientCorrelationId</td>
  </tr>
    <td><a href="/docs/merchantPayment/viewResource.Readme.md">Retrieve Representation a Missing Resource</a></td>
    <td>viewResource</td>
    <td>link</td>
  </tr>
</tbody>
</table>

### Disbursements
<table>
<thead>
  <tr>
    <th>Scenarios</th>
    <th>API</th>
    <th>Function</th>
    <th>Parameters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Individual Disbursement</td>
    <td><a href="/docs/disbursement/createDisbursementTransaction.Readme.md">Perform an Individual Disbursement</a></td>
    <td>createDisbursementTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="4">Bulk Disbursement</td>
    <td><a href="/docs/disbursement/createBatchTransaction.Readme.md">Perform a Bulk Disbursement</a></td>
    <td>createBatchTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewBatchTransaction.Readme.md">View A Transaction Batch</a></td>
    <td>viewBatchTransaction</td>
    <td>batchId</td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewBatchCompletions.Readme.md">Retrieve Batch Transactions that have Completed</a></td>
    <td>viewBatchCompletions</td>
    <td>batchId</td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewBatchRejections.Readme.md">Retrieve Batch Transactions that have been Rejected
</a></td>
    <td>viewBatchRejections</td>
    <td>batchId</td>
  </tr>
  <tr>
    <td rowspan="5">Bulk Disbursement with Maker / Checker</td>
    <td><a href="/docs/disbursement/createBatchTransaction.Readme.md">Perform a Bulk Disbursement</a></td>
    <td>createBatchTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/updateBatchTransaction.Readme.md">Update A Transaction Batch</a></td>
    <td>updateBatchTransaction</td>
    <td>batchId</td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewBatchTransaction.Readme.md">View A Transaction Batch</a></td>
    <td>viewBatchTransaction</td>
    <td>batchId</td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewBatchCompletions.Readme.md">Retrieve Batch Transactions that have Completed</a></td>
    <td>viewBatchCompletions</td>
    <td>batchId</td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewBatchRejections.Readme.md">Retrieve Batch Transactions that have been Rejected</a></td>
    <td>viewBatchRejections</td>
    <td>batchId</td>
  </tr>
  <tr>
    <td rowspan="3">Individual Disbursement Using the Polling Method</td>
    <td><a href="/docs/disbursement/createDisbursementTransaction.Readme.md">Perform an Individual Disbursement</a></td>
    <td>createDisbursementTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewRequestState.Readme.md">Poll to Determine the Request State</a></td>
    <td>viewRequestState</td>
    <td>serverCorrelationId</td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewTransaction.Readme.md">Retrieve a Transaction</a></td>
    <td>viewTransaction</td>
    <td>transactionReference</td>
  </tr>
  <tr>
    <td>Disbursement Reversal</td>
    <td><a href="/docs/disbursement/createReversal.Readme.md">Perform a Transaction Reversal</a></td>
    <td>createReversal</td>
    <td>originalTransactionReference</td>
  </tr>
  <tr>
    <td>Obtain a Disbursement Organisation Balance</td>
    <td><a href="/docs/disbursement/viewAccountBalance.Readme.md">Get an Account Balance</a></td>
    <td>viewAccountBalance</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td>Retrieve Transactions for a Disbursement Organisation</td>
    <td><a href="/docs/disbursement/viewAccountTransactions.Readme.md">Retrieve a Set of Transactions for an Account</a></td>
    <td>viewAccountTransactions</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td>Check for Service Availability</td>
    <td><a href="/docs/disbursement/viewServiceAvailability.Readme.md">Check for Service Availability</a></td>
    <td>viewServiceAvailability</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Retrieve a Missing API Response</td>
    <td><a href="/docs/disbursement/viewResponse.Readme.md">Retrieve a Missing Response</a></td>
    <td>viewResponse</td>
    <td>clientCorrelationId</td>
  </tr>
  <tr>
    <td><a href="/docs/disbursement/viewResource.Readme.md">Retrieve Representation a Missing Resource</a></td>
    <td>viewResource</td>
    <td>link</td>
  </tr>
</tbody>
</table>

### International Transfers

<table>
<thead>
  <tr>
    <th>Scenarios</th>
    <th>API</th>
    <th>Function</th>
    <th>Parameters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="2">International Transfer via Hub</td>
    <td><a href="/docs/internationalTransfer/createQuotation.Readme.md">Request a International Transfer Quotation</a></td>
    <td>createQuotation</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/internationalTransfer/createInternationalTransaction.Readme.md">Perform an International Transfer</a></td>
    <td>createInternationalTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Bilateral International Transfer</td>
    <td><a href="/docs/internationalTransfer/createQuotation.Readme.md">Request a International Transfer Quotation</a></td>
    <td>createQuotation</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/internationalTransfer/createInternationalTransaction.Readme.md">Perform an International Transfer</a></td>
    <td>createInternationalTransaction</td>
    <td></td>
  </tr>
  <tr>
  <tr>
    <td>International Transfer Reversal</td>
    <td><a href="/docs/internationalTransfer/createReversal.Readme.md">Perform a Transaction Reversal</a></td>
    <td>createReversal</td>
    <td>originalTransactionReference</td>
  </tr>
  <tr>
    <td>Obtain an FSP Balance</td>
    <td><a href="/docs/internationalTransfer/viewAccountBalance.Readme.md">Get an Account Balance</a></td>
    <td>viewAccountBalance</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td>Retrieve Transactions for an FSP</td>
    <td><a href="/docs/internationalTransfer/viewAccountTransactions.Readme.md">Retrieve a Set of Transactions for an Account</a></td>
    <td>viewAccountTransactions</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td>Check for Service Availability</td>
    <td><a href="/docs/internationalTransfer/viewServiceAvailability.Readme.md">Check for Service Availability</a></td>
    <td>viewServiceAvailability</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Retrieve a Missing API Response</td>
    <td><a href="/docs/internationalTransfer/viewResponse.Readme.md">Retrieve a Missing Response</a></td>
    <td>viewResponse</td>
    <td>clientCorrelationId</td>
  </tr>
  <tr>
    <td><a href="/docs/internationalTransfer/viewResource.Readme.md">Retrieve Representation a Missing Resource</a></td>
    <td>viewResource</td>
    <td>link</td>
  </tr>
</tbody>
</table>

### P2P Transfers

<table>
<thead>
  <tr>
    <th>Scenarios</th>
    <th>API</th>
    <th>Function</th>
    <th>Parameters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="3">P2P Transfer via Switch</td>
    <td><a href="/docs/p2pTransfer/viewAccountName.Readme.md">Retrieve the Name of the Recipient</a></td>
    <td>viewAccountName</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td><a href="/docs/p2pTransfer/createQuotation.Readme.md">Request a P2P Quotation</a></td>
    <td>createQuotation</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/p2pTransfer/createTransferTransaction.Readme.md">Perform a P2P Transfer</a></td>
    <td>createTransferTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Bilateral P2P Transfer</td>
    <td><a href="/docs/p2pTransfer/viewAccountName.Readme.md">Retrieve the Name of the Recipient</a></td>
    <td>viewAccountName</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td><a href="/docs/p2pTransfer/createTransferTransaction.Readme.md">Perform a P2P Transfer</a></td>
    <td>createTransferTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="3">‘On-us’ P2P Transfer Initiated by a Third Party Provider</td>
    <td><a href="/docs/p2pTransfer/viewAccountName.Readme.md">Retrieve the Name of the Recipient</a></td>
    <td>viewAccountName</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td><a href="/docs/p2pTransfer/createQuotation.Readme.md">Request a P2P Quotation</a></td>
    <td>createQuotation</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/p2pTransfer/createTransferTransaction.Readme.md">Perform a P2P Transfer</a></td>
    <td>createTransferTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td>P2P Transfer Reversal</td>
    <td><a href="/docs/p2pTransfer/createReversal.Readme.md">Perform a Transaction Reversal</a></td>
    <td>createReversal</td>
    <td>originalTransactionReference</td>
  </tr>
  <tr>
    <td>Obtain an FSP Balance</td>
    <td><a href="/docs/p2pTransfer/viewAccountBalance.Readme.md">Get an Account Balance</a></td>
    <td>viewAccountBalance</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
   <tr>
    <td>Retrieve Transactions for an FSP</td>
    <td><a href="/docs/p2pTransfer/viewAccountTransactions.Readme.md">Retrieve a Set of Transactions for an Account</a></td>
    <td>viewAccountTransactions</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td>Check for Service Availability</td>
    <td><a href="/docs/p2pTransfer/viewServiceAvailability.Readme.md">Check for Service Availability</a></td>
    <td>viewServiceAvailability</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Retrieve a Missing API Response</td>
    <td><a href="/docs/p2pTransfer/viewResponse.Readme.md">Retrieve a Missing Response</a></td>
    <td>viewResponse</td>
    <td>clientCorrelationId</td>
  </tr>
  <tr>
    <td><a href="/docs/p2pTransfer/viewResource.Readme.md">Retrieve Representation a Missing Resource</a></td>
    <td>viewResource</td>
    <td>link</td>
  </tr>
</tbody>
</table>

### Recurring Payments

<table>
<thead>
  <tr>
    <th>Scenarios</th>
    <th>API</th>
    <th>Function</th>
    <th>Parameters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="1">Setup a Recurring Payment</td>
    <td><a href="/docs/recurringPayment/createAccountDebitMandate.Readme.md">Setup a Recurring Payment</a></td>
    <td>createAccountDebitMandate</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td rowspan="1">Take a Recurring Payment</td>
    <td><a href="/docs/recurringPayment/createMerchantTransaction.Readme.md">Take a Recurring Payment</a></td>
    <td>createMerchantTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="1">Take a Recurring Payment using the Polling Method</td>
    <td><a href="/docs/recurringPayment/createMerchantTransaction.Readme.md">Take a Recurring Payment</a></td>
    <td>createMerchantTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="1">Recurring Payment Refund</td>
    <td><a href="/docs/recurringPayment/createRefundTransaction.Readme.md">Perform a Recurring Payment Refund</a></td>
    <td>createRefundTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="1">Recurring Payment Reversal</td>
    <td><a href="/docs/recurringPayment/createReversal.Readme.md">Perform a Merchant Payment Reversal</a></td>
    <td>createReversal</td>
    <td>originalTransactionReference</td>
  </tr>
  <tr>
    <td rowspan="1">Payer sets up a Recurring Payment using MMP Channel</td>
    <td><a href="/docs/recurringPayment/createAccountDebitMandate.Readme.md">Setup a Recurring Payment</a></td>
    <td>createAccountDebitMandate</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td rowspan="1">Obtain a Service Provider Balance</td>
    <td><a href="/docs/recurringPayment/viewAccountBalance.Readme.md">Get an Account Balance</a></td>
    <td>viewAccountBalance</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td rowspan="1">Retrieve Payments for a Service Provider</td>
    <td><a href="/docs/recurringPayment/viewAccountTransactions.Readme.md">Retrieve a Set of Transactions for an Account</a></td>
    <td>viewAccountTransactions</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td rowspan="1">Check for Service Availability</td>
    <td><a href="/docs/recurringPayment/viewServiceAvailability.Readme.md">Check for Service Availability</a></td>
    <td>viewServiceAvailability</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Retrieve a Missing API Response</td>
    <td><a href="/docs/recurringPayment/viewResponse.Readme.md">Retrieve a Missing Response</a></td>
    <td>viewResponse</td>
    <td>clientCorrelationId</td>
  </tr>
  <tr>
    <td><a href="/docs/recurringPayment/viewResource.Readme.md">Retrieve a Missing Resource</a></td>
    <td>viewResource</td>
    <td>link</td>
  </tr>
</tbody>
</table>

### Account Linking

<table>
<thead>
  <tr>
    <th>Scenarios</th>
    <th>API</th>
    <th>Function</th>
    <th>Parameters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="1">Setup an Account Link</td>
    <td><a href="/docs/p2pTransfer/createAccountLink.Readme.md">Establish an Account to Account Link</a></td>
    <td>createAccountLink</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td rowspan="1">Perform a Transfer for a Linked Account</td>
    <td><a href="/docs/p2pTransfer/createTransferTransaction.Readme.md">Use a Link to make a Transfer</a></td>
    <td>createTransferTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="1">Perform a Transfer using an Account Link via the Polling Method</td>
    <td><a href="/docs/p2pTransfer/createTransferTransaction.Readme.md">Use a Link to make a Transfer</a></td>
    <td>createTransferTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="1">Perform a Transfer Reversal</td>
    <td><a href="/docs/p2pTransfer/createReversal.Readme.md">Perform a Transaction Reversal</a></td>
    <td>createReversal</td>
    <td>originalTransactionReference</td>
  </tr>
  <tr>
    <td rowspan="1">Obtain a Financial Service Provider Balance</td>
    <td><a href="/docs/p2pTransfer/viewAccountBalance.Readme.md">Get an Account Balance</a></td>
    <td>viewAccountBalance</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td rowspan="1">Retrieve Transfers for a Financial Service Provider</td>
    <td><a href="/docs/p2pTransfer/viewAccountTransactions.Readme.md">Retrieve a Set of Transactions for an Account</a></td>
    <td>viewAccountTransactions</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td rowspan="1">Check for Service Availability</td>
    <td><a href="/docs/p2pTransfer/viewServiceAvailability.Readme.md">Check for Service Availability</a></td>
    <td>viewServiceAvailability</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Retrieve a Missing API Response</td>
    <td><a href="/docs/p2pTransfer/viewResponse.Readme.md">Retrieve a Missing Response</a></td>
    <td>viewResponse</td>
    <td>clientCorrelationId</td>
  </tr>
  <tr>
    <td><a href="/docs/p2pTransfer/viewResource.Readme.md">Retrieve a Missing Resource</a></td>
    <td>viewResource</td>
    <td>link</td>
  </tr>
</tbody>
</table>

### Bill Payments

<table>
<thead>
  <tr>
    <th>Scenarios</th>
    <th>API</th>
    <th>Function</th>
    <th>Parameters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="1">Successful Retrieval of Bills</td>
    <td><a href="/docs/billPayment/viewAccountBills.Readme.md">Retrieve a Set of Bills</a></td>
    <td>viewAccountBills</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td rowspan="2">Make a Successful Bill Payment with Callback</td>
    <td><a href="/docs/billPayment/createBillTransaction.Readme.md">Perform a Bill Payment Transaction</a></td>
    <td>createBillTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/billPayment/createBillPayment.Readme.md">Make a Bill Payment</a></td>
    <td>createBillPayment</td>
    <td>{ identifierType1: identifier1 }, billReference</td>
  </tr>
 <tr>
    <td rowspan="3">Make a Bill Payment with Polling</td>
    <td><a href="/docs/billPayment/createBillPayment.Readme.md">Make a Bill Payment Via the Polling Method</a></td>
    <td>createBillPayment</td>
    <td>{ identifierType1: identifier1 }, billReference</td>
  </tr>
  <tr>
    <td><a href="/docs/billPayment/viewRequestState.Readme.md">Poll to Determine the Request State</a></td>
    <td>viewRequestState</td>
    <td>serverCorrelationId</td>
  </tr>
  <tr>
    <td><a href="/docs/billPayment/viewBillPayment.Readme.md">Retrieve Bill Payments for a Given Bill</a></td>
    <td>viewBillPayment</td>
    <td>{ identifierType1: identifier1 }, billReference</td>
  </tr>
  <tr>
    <td rowspan="1">Retrieval of Bill Payments</td>
    <td><a href="/docs/billPayment/viewBillPayment.Readme.md">Retrieve a Set of Bill Payments</a></td>
    <td>viewBillPayment</td>
    <td>{ identifierType1: identifier1 }, billReference</td>
  </tr>
  <tr>
    <td rowspan="1">Retrieve a Transaction</td>
    <td><a href="/docs/billPayment/viewTransaction.Readme.md">Retrieve a Transaction</a></td>
    <td>viewTransaction</td>
    <td>transactionReference</td>
  </tr>
  <tr>
    <td rowspan="1">Check for Service Availability</td>
    <td><a href="/docs/billPayment/viewServiceAvailability.Readme.md">Check for Service Availability</a></td>
    <td>viewServiceAvailability</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Retrieve a Missing API Response</td>
    <td><a href="/docs/billPayment/viewResponse.Readme.md">Retrieve a Missing Response</a></td>
    <td>viewResponse</td>
    <td>clientCorrelationId</td>
  </tr>
  <tr>
    <td><a href="/docs/billPayment/viewResource.Readme.md">Retrieve a Missing Resource</a></td>
    <td>viewResource</td>
    <td>link</td>
  </tr>
</tbody>
</table>

### Agent Services

<table>
<thead>
  <tr>
    <th>Scenarios</th>
    <th>API</th>
    <th>Function</th>
    <th>Parameters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="1">Agent-initiated Cash-out</td>
    <td><a href="/docs/agentService/createWithdrawalTransaction.Readme.md">Agent Initiated Cash-out</a></td>
    <td>createWithdrawalTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="3">Agent-initiated Cash-out using the Polling Method</td>
    <td><a href="/docs/agentService/createWithdrawalTransaction.Readme.md">Agent Initiated Cash-out</a></td>
    <td>createWithdrawalTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="/docs/agentService/viewRequestState.Readme.md">Poll to Determine the Request State</a></td>
    <td>viewRequestState</td>
    <td>serverCorrelationId</td>
  </tr>
  <tr>
    <td><a href="/docs/agentService/viewTransaction.Readme.md">Retrieve a Transaction</a></td>
    <td>viewTransaction</td>
    <td>transactionReference</td>
  </tr>
  <tr>
    <td rowspan="2">Customer Cash - out at an ATM using an Authorisation Code</td>
    <td><a href="/docs/agentService/createAuthorisationCode.Readme.md">Obtain an Authorisation Code</a></td>
    <td>createAuthorisationCode</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td><a href="/docs/agentService/createWithdrawalTransaction.Readme.md">ATM Initiated Cash-Out</a></td>
    <td>createWithdrawalTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Agent-initiated Customer Cash-in</td>
    <td><a href="/docs/agentService/viewAccountName.Readme.md">Retrieve the Name of the Depositing Customer</a></td>
    <td>viewAccountName</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td><a href="/docs/agentService/createDepositTransaction.Readme.md">Agent Initiated Cash-in</a></td>
    <td>createDepositTransaction</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="1">Cash-out Reversal</td>
    <td><a href="/docs/agentService/createReversal.Readme.md">Perform a Transaction Reversal</a></td>
    <td>createReversal</td>
    <td>originalTransactionReference</td>
  </tr>
  <tr>
    <td rowspan="1">Register a Customer Mobile Money Account</td>
    <td><a href="/docs/agentService/createAccount.Readme.md">Create a Mobile Money Account</a></td>
    <td>createAccount</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Verify a Customer’s KYC</td>
    <td><a href="/docs/agentService/viewAccount.Readme.md">Retrieve Account Information</a></td>
    <td>viewAccount</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td><a href="/docs/agentService/updateAccountIdentity.Readme.md">Update KYC Verification Status</a></td>
    <td>updateAccountIdentity</td>
    <td>{ identifierType1: identifier1 }, identityId</td>
  </tr>
  <tr>
    <td rowspan="1">Obtain an Agent Balance</td>
    <td><a href="/docs/agentService/viewAccountBalance.Readme.md">Get an Account Balance</a></td>
    <td>viewAccountBalance</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td rowspan="1">Retrieve Transactions for an Agent</td>
    <td><a href="/docs/agentService/viewAccountTransactions.Readme.md">Retrieve a Set of Transactions for an Account</a></td>
    <td>viewAccountTransactions</td>
    <td>{ identifierType1: identifier1 }</td>
  </tr>
  <tr>
    <td rowspan="1">Check for Service Availability</td>
    <td><a href="/docs/agentService/viewServiceAvailability.Readme.md">Check for Service Availability</a></td>
    <td>viewServiceAvailability</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Retrieve a Missing API Response</td>
    <td><a href="/docs/agentService/viewResponse.Readme.md">Retrieve a Missing Response</a></td>
    <td>viewResponse</td>
    <td>clientCorrelationId</td>
  </tr>
  <tr>
    <td><a href="/docs/agentService/viewResource.Readme.md">Retrieve a Missing Resource</a></td>
    <td>viewResource</td>
    <td>link</td>
  </tr>
</tbody>
</table>

## Tests

It is not mandatory to fork this repository for using the MMAPI SDK. You can refer Setting Up for configuring and working with SDK without forking this code.

For contributing or referring the samples, you can fork/refer this repository.

To run integration tests using your consumer key, consumer secret and api key, clone this repository and run the following command:

So, there are actually two different types of tests, and we're going to try them all. The first is a unit test. The second type of test is an integration test.

```
$ npm install
$ CONSUMER_KEY=YOUR_CONSUMER_KEY CONSUMER_SECRET=YOUR_CONSUMER_SECRET API_KEY=YOUR_API_KEY SECURITY_OPTION=YOUR_SECURITY_OPTION CALLBACK_URL=YOUR_CALLBACK_URL npm run test
```

### Unit Test

In a unit test, you test one specific function on a class. You call a function with some input, and test the return value. Each unit test is done in isolation. If, for example, a class needs a simulator connection, we're actually going to fake that simulator connection so that we can focus on testing just the logic of the class itself.

```
$ npm install
$ CONSUMER_KEY=YOUR_CONSUMER_KEY CONSUMER_SECRET=YOUR_CONSUMER_SECRET API_KEY=YOUR_API_KEY SECURITY_OPTION=YOUR_SECURITY_OPTION CALLBACK_URL=YOUR_CALLBACK_URL npm run test test/unit
```

### Integration Test

An integration test is basically a unit test: you call functions and check their return values. But now, instead of faking the simulator connection, you'll use the real simulator connection.

```
$ npm install
$ CONSUMER_KEY=YOUR_CONSUMER_KEY CONSUMER_SECRET=YOUR_CONSUMER_SECRET API_KEY=YOUR_API_KEY SECURITY_OPTION=YOUR_SECURITY_OPTION CALLBACK_URL=YOUR_CALLBACK_URL npm run test test/integration
```

## Samples

To test interactions before integration by by trying out different samples, clone this repository and run the following command:

Note: Update the samples/test_harness.js with your sandbox client credentials or pass your client credentials as environment variable while executing the samples.

**To run all usecase scenarios for a usecase (merchantpay, disbursements, etc)**

```
$ npm install
$ CONSUMER_KEY=YOUR_CONSUMER_KEY CONSUMER_SECRET=YOUR_CONSUMER_SECRET API_KEY=YOUR_API_KEY SECURITY_OPTION=YOUR_SECURITY_OPTION CALLBACK_URL=YOUR_CALLBACK_URL node samples/merchantPayment/runAll.js
```

```
$ npm install
$ node samples/merchantPayment/runAll.js
```

*By default runAll.js will execute all usecase scenarios for the usecase*

> To select a specific use case scenario, edit the samples/merchantPayment/runAll.js by passing the usecase number as shown below

```javascript
(async () => {

})(5);
```

**To run a usecase scenario by passing parameters to the function manually**

*Replace the parameter with a value*

```javascript
// samples/merchantPayment/createMerchantTransaction.js

if (require.main === module) {
  (async () => {
    try {
      await createMerchantTransaction(false, true);
    } catch (err) {
    }
  })();
}
```

```
$ npm install
$ node samples/merchantPayment/createMerchantTransaction.js
```
