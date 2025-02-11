# View Account Name

`Here, viewAccountName({ identifierType1: identifier1 }) creates a GET request to /accounts/{identifierType}/{identifier}/accountname`

> `This endpoint returns the name of an account holder where one identifier suffices to uniquely identify an account.`

`Here, viewAccountName({ identifierType1: identifier1, identifierType2: identifier2, identifierType3: identifier3 }) creates a GET request to  GET /accounts/{AccountIdentifiers}/accountname`

> `This endpoint returns the name of an account holder where a single identifier is not sufficient to identify an account.`

### Usage/Examples

```javascript
/**
 * Set up your function to be invoked
 */
const viewAccountName = async (debug = false) => {
  try {
    /**
     * Construct a request object and set desired parameters
     */
    const request = new mmapi.agentService.viewAccountName({ "walletid": "1" });

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
viewAccountName(true);
```

### Example Output

```javascript
200

{
  "name": {
    "title": "Mr",
    "firstName": "Jeff",
    "middleName": "James",
    "lastName": "Jimmer",
    "fullName": "Jeff Jimmer"
  },
  "lei": "AAAA0012345678901299"
}
```
