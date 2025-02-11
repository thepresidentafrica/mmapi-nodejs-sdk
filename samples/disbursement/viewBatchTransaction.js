'use strict';

/**
 * mobileMoneyApi Node.js SDK dependency
 */
require('../test_helper');

/**
 * mobileMoneyApi HTTP client dependency
 */
const client = require('../test_harness').client();

/**
 * Set up your function to be invoked
 */
const viewBatchTransaction = async (batchId, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.viewBatchTransaction(batchId);

    if (debug) {
      console.log("Request: ", JSON.stringify(request, null, 4));
    }

    /**
     * Call API with your client and get a response for your call
     */
    const response = await client.execute(request);

    if (debug) {
      console.log("Response Status: ", response.status);
      console.log("Response Data: ", JSON.stringify(response.data, null, 4));
    }

    /**
     * Return a successful response
     */
    return response;
  } catch (err) {
    /**
     * Handle any errors from the call
     */
    if (debug) {
      console.log(err);
    }

    /**
     * Return an error response
     */
    return err;
  }
};

/**
 * This module was run directly from the command line as in node xxx.js
 */
if (require.main === module) {
  /**
   * This is an immediately invoked function
   */
  (async () => {
    try {
      await viewBatchTransaction('<<REPLACE-WITH-BATCH-ID>>', true);
    } catch (err) {
    }
  })();
}

/**
* Exports the function. If needed this can be invoked from the other modules.
*/
module.exports = {
  viewBatchTransaction
};