# View A Transaction Batch

`Here, viewBatchTransaction(batchId) creates a GET request to /batchtransactions/{batchId}`

> `This endpoint returns the current status of a batch transaction.`

### Usage / Examples

```javascript
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
 * Invoke the function
 */
viewBatchTransaction('<<REPLACE-WITH-BATCH-ID>>', true);
```

### Example Output

```javascript
200

{
  "batchId": "REF-1635846330263",
  "batchStatus": "created",
  "batchTitle": "Batch_Test",
  "batchDescription": "Testing a Batch",
  "processingFlag": false,
  "completedCount": 0,
  "rejectionCount": 0,
  "parsingSuccessCount": 0,
  "scheduledStartDate": "2019-12-11T15:08:03",
  "creationDate": "2021-11-02T09:45:30",
  "modificationDate": "2021-11-02T09:45:30",
  "requestDate": "2021-11-02T09:45:30"
}
```
