'use strict';

/**
 * mobileMoneyApi Node JS SDK dependency
 */
const mmapi = require('../../lib/index');

/**
 * mobileMoneyApi HTTP client dependency
 */
const client = require('../sample_harness').client();

/**
 * This function can be used to check service availability.
 */
let checkForServiceAvailability = async function () {
  try {
    const request = new mmapi.common.CheckForServiceAvailabilityRequest();

    const response = await client.execute(request);
    console.log("Response Status: " + response.status);
    console.log("Respoanse Data: " + JSON.stringify(response.data, null, 4));

    return response;
  } catch (e) {
    console.log(e)
  }
};

/**
 * This is the immediately invoked function which invokes the checkForServiceAvailability function.
*/
if (require.main === module) {
 (async () => {
   await checkForServiceAvailability();
 })();
}

/**
 * Exports the checkForServiceAvailability function. If needed this can be invoked from the other modules.
 */
module.exports = { checkForServiceAvailability: checkForServiceAvailability };

