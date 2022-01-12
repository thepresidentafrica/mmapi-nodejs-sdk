'use strict';

const mmapi = require('../../lib/index');
const nock = require('nock');

describe('Quotation', function () {
  let environment = new mmapi.core.SandboxEnvironment('consumerKey', 'consumerSecret', 'apiKey', 'ENHANCED_LEVEL', 'https://e765d0c6-3d88-40d4-9fd8-ef93b154d663.mock.pstmn.io/callback');

  beforeEach(function () {
    clearToken();
    this.http = new mmapi.core.MobileMoneyApiHttpClient(environment);
    this.context = nock(environment.baseUrl);

    switch (environment.securityOption) {
      case 'DEVELOPMENT_LEVEL':
        this.securityOptionUrl = `/simulator/v1.2/passthrough/mm`;
        break;
      case 'STANDARD_LEVEL':
      case 'ENHANCED_LEVEL':
        this.securityOptionUrl = `/2/oauth/simulator/v1.2/mm`;
        break;
      default:
        this.securityOptionUrl = `/simulator/v1.2/passthrough/mm`
        break;
    }

    nock.cleanAll();
  });

  afterEach(() => nock.cleanAll());

  function mockAccessTokenRequest(context, options) {
    options = options || {};

    let accessTokenValue = options.refreshTokenResponse ? 'access-token-from-refresh-token' : 'simple-access-token';
    let times = options.times || 1;

    return context.post('/v1/oauth/accesstoken').times(times).reply(200, function (uri, requestBody) {
      const token = {
        access_token: accessTokenValue,
        expires_in: options.expiresIn || 3600,
        token_type: 'Bearer'
      };

      if (options.refreshTokenValue) {
        token.refresh_token = options.refreshTokenValue;
      }
      return token;
    }, { 'Content-Type': 'application/json' });
  }

  function clearToken() {
    const client = mmapi.core.TokenCache.cacheForEnvironment(environment);
    client.setToken(null);
  }

  function createToken(expired, refresh) {
    const token = new mmapi.core.AccessToken({
      access_token: 'simple-access-token',
      expires_in: expired ? 0 : 3600,
      token_type: 'Bearer',
    });
    token._dateCreated = Date.now() - (expired ? 360000 : 0);
    if (refresh) {
      token.refresh_token = 'refresh-token';
    }
    return token;
  }

  function authHeader(refresh) {
    return {
      reqheaders: {
        authorization: refresh ? 'Bearer access-token-from-refresh-token' : 'Bearer simple-access-token'
      }
    }
  }

  describe('CreateQuotation', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.internationalTransfer.createQuotation({ "msisdn": '+44012345678' });

      request.body({
        "creditParty": [
          {
            "key": "msisdn",
            "value": "+44012345678"
          }
        ],
        "debitParty": [
          {
            "key": "walletid",
            "value": "1"
          }
        ],
        "requestAmount": "16.00",
        "requestCurrency": "USD",
        "requestDate": "2018-07-03T11:43:27.405Z",
        "type": "inttransfer",
        "subType": "abc",
        "chosenDeliveryMethod": "agent",
        "senderKyc": {
          "nationality": "GB",
          "dateOfBirth": "1970-07-03T11:43:27.405Z",
          "occupation": "Manager",
          "employerName": "MFX",
          "contactPhone": "+447125588999",
          "gender": "m",
          "emailAddress": "luke.skywalkeraaabbb@gmail.com",
          "birthCountry": "GB",
          "idDocument": [
            {
              "idType": "nationalidcard",
              "idNumber": "1234567",
              "issueDate": "2018-07-03T11:43:27.405Z",
              "expiryDate": "2021-07-03T11:43:27.405Z",
              "issuer": "UKPA",
              "issuerPlace": "GB",
              "issuerCountry": "GB",
              "otherIdDescription": "test"
            }
          ],
          "postalAddress": {
            "country": "GB",
            "addressLine1": "111 ABC Street",
            "city": "New York",
            "stateProvince": "New York",
            "postalCode": "ABCD"
          },
          "subjectName": {
            "title": "Mr",
            "firstName": "Luke",
            "middleName": "R",
            "lastName": "Skywalker",
            "fullName": "Luke R Skywalker",
            "nativeName": "ABC"
          }
        },
        "customData": [
          {
            "key": "keytest",
            "value": "keyvalue"
          }
        ],
        "sendingServiceProviderCountry": "AD",
        "originCountry": "AD",
        "receivingCountry": "AD"
      });
    })

    afterEach(async () => {
    });

    it('should return the notification method polling by default', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return notification method callback if callback is invoked', async function () {
      request.callback('https://test.com/callback');

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "callback", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('callback');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return notification method polling if polling is invoked', async function () {
      request.polling();

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property creditParty if creditParty is invoked', async function () {
      request.creditParty([
        {
          "key": "msisdn",
          "value": "+44012345678"
        }
      ]);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('creditParty');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property debitParty if debitParty is invoked', async function () {
      request.debitParty([
        {
          "key": "walletid",
          "value": "1"
        }
      ]);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('debitParty');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property type if type is invoked', async function () {
      request.type("inttransfer");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('type');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property subType if subType is invoked', async function () {
      request.subType("abc");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('subType');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property requestAmount if requestAmount is invoked', async function () {
      request.requestAmount("16.00");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('requestAmount');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property requestCurrency if requestCurrency is invoked', async function () {
      request.requestCurrency("USD");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('requestCurrency');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property chosenDeliveryMethod if chosenDeliveryMethod is invoked', async function () {
      request.chosenDeliveryMethod("agent");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('chosenDeliveryMethod');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property originCountry if originCountry is invoked', async function () {
      request.originCountry("AD");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('originCountry');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property receivingCountry if receivingCountry is invoked', async function () {
      request.receivingCountry("AD");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('receivingCountry');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property recipientKyc if recipientKyc is invoked', async function () {
      request.recipientKyc({ "employerName": "exampleEmployerName" });

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('recipientKyc');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property senderKyc if senderKyc is invoked', async function () {
      request.senderKyc({
        "nationality": "GB",
        "dateOfBirth": "1970-07-03T11:43:27.405Z",
        "occupation": "Manager",
        "employerName": "MFX",
        "contactPhone": "+447125588999",
        "gender": "m",
        "emailAddress": "luke.skywalkeraaabbb@gmail.com",
        "birthCountry": "GB",
        "idDocument": [
          {
            "idType": "nationalidcard",
            "idNumber": "1234567",
            "issueDate": "2018-07-03T11:43:27.405Z",
            "expiryDate": "2021-07-03T11:43:27.405Z",
            "issuer": "UKPA",
            "issuerPlace": "GB",
            "issuerCountry": "GB",
            "otherIdDescription": "test"
          }
        ],
        "postalAddress": {
          "country": "GB",
          "addressLine1": "111 ABC Street",
          "city": "New York",
          "stateProvince": "New York",
          "postalCode": "ABCD"
        },
        "subjectName": {
          "title": "Mr",
          "firstName": "Luke",
          "middleName": "R",
          "lastName": "Skywalker",
          "fullName": "Luke R Skywalker",
          "nativeName": "ABC"
        }
      });

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('senderKyc');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property requestingOrganisation if requestingOrganisation is invoked', async function () {
      request.requestingOrganisation({
        "requestingOrganisationIdentifierType": "organisationid",
        "requestingOrganisationIdentifier": "12345"
      });

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('requestingOrganisation');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property sendingServiceProviderCountry if sendingServiceProviderCountry is invoked', async function () {
      request.sendingServiceProviderCountry("AD");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('sendingServiceProviderCountry');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property requestDate if requestDate is invoked', async function () {
      request.requestDate("2018-07-03T11:43:27");

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('requestDate');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property customData if customData is invoked', async function () {
      request.customData([
        {
          "key": "keytest",
          "value": "keyvalue"
        }
      ]);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('customData');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });

    it('should return request data with property metadata if metadata is invoked', async function () {
      request.metadata([
        {
          "key": "keytest",
          "value": "keyvalue"
        }
      ]);

      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .post(`${this.securityOptionUrl}${request.url}`, request.data)
        .reply(202, {
          "serverCorrelationId": "eb95b1b5-79bb-4729-9d7c-67d8bd357f8e", "status": "pending", "notificationMethod": "polling", "objectReference": "804", "pollLimit": 100
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(request.data).toHaveProperty('metadata');
      expect(response.status).toBe(202);
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('pending');
      expect(response.data).toHaveProperty('serverCorrelationId');
      expect(response.data).toHaveProperty('notificationMethod');
      expect(response.data.notificationMethod).toBe('polling');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });
  })

  describe('ViewQuotation', function () {
    const authTokenHeader = authHeader(false);
    const authRefreshHeader = authHeader(true);

    let request;

    beforeEach(async () => {
      request = new mmapi.internationalTransfer.viewQuotation("REF-1636533162268");
    })

    afterEach(async () => {
    });

    it('should return a link object if request is valid', async function () {
      let requestNock = nock(environment.baseUrl, authTokenHeader)
        .get(`${this.securityOptionUrl}${request.url}`)
        .reply(200, {
          "quotationReference": "REF-1636533162268", "creditParty": [{ "key": "accountid", "value": "2000" }, { "key": "linkref", "value": "REF-1621839627337" }, { "key": "linkref", "value": "REF-1635445811066" }], "debitParty": [{ "key": "accountid", "value": "2999" }], "type": "inttransfer", "subType": "abc", "quotationStatus": "completed", "requestAmount": "75.30", "requestCurrency": "RWF", "chosenDeliveryMethod": "agent", "originCountry": "AD", "receivingCountry": "AD", "senderKyc": { "nationality": "GB", "dateOfBirth": "1970-07-03", "occupation": "Manager", "employerName": "MFX", "contactPhone": "+447125588999", "gender": "m", "idDocument": [{ "idType": "nationalidcard", "idNumber": "1234567", "issueDate": "2018-07-03", "expiryDate": "2021-07-03", "issuer": "UKPA", "issuerPlace": "GB", "issuerCountry": "GB" }], "postalAddress": { "addressLine1": "111 ABC Street", "city": "New York", "stateProvince": "New York", "postalCode": "ABCD", "country": "GB" }, "subjectName": { "title": "Mr", "firstName": "Luke", "middleName": "R", "lastName": "Skywalker", "fullName": "Luke R Skywalker", "nativeName": "ABC" }, "emailAddress": "luke.skywalkeraaabbb@gmail.com", "birthCountry": "GB" }, "sendingServiceProviderCountry": "AD", "creationDate": "2021-11-10T08:32:42", "modificationDate": "2021-11-10T08:32:42", "requestDate": "2018-07-03T11:43:27", "customData": [{ "key": "keytest", "value": "keyvalue" }]
        }, {
          "Content-Type": "application/json"
        });

      let accessTokenNock = mockAccessTokenRequest(this.context, { times: 1 });

      const response = await this.http.execute(request);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('quotationReference');
      expect(response.data).toHaveProperty('creditParty');
      expect(response.data).toHaveProperty('debitParty');
      expect(response.data).toHaveProperty('requestAmount');
      expect(response.data).toHaveProperty('requestCurrency');
      expect(requestNock.isDone()).toBe(true);
      expect(accessTokenNock.isDone()).toBe(true);
    });
  })

});