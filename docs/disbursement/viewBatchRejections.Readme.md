# View Batch Rejections

`Here, viewBatchRejections(batchId) creates a GET request to /batchtransactions/{batchId}/rejections`

> `This API enables clients to retrieve information on all transactions that have either failed parsing or have failed to complete.`

### Usage / Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewBatchRejections = async (batchId, debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.disbursement.viewBatchRejections(batchId);

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
      console.log("Response X-Records-Available-Count", response.headers['x-records-available-count']);
      console.log("Response X-Records-Returned-Count", response.headers['x-records-returned-count']);
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
viewBatchRejections('<<REPLACE-WITH-BATCH-ID>>', true);
```

### Example Output

```javascript
200

[]
```
