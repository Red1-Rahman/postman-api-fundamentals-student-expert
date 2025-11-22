/** Make compatible with Postman API */
let body = pm.response.json()

if (body.collection) {
    body = body.collection
}

const reqs = body.item
 /** 1. get books */
const req1 = reqs[0]
pm.test("[get books] Is a GET request", function () {
    pm.expect(req1.request.method,"Fix: Change the method to GET method").to.equal("GET");
});

pm.test(`[get books] base URL is set to \{\{baseUrl\}\}`, function () {
    const pattern = /^{{baseUrl}}/i
    const url = req1.request.url.raw || req1.request.url
    pm.expect(url.trim(),`Fix: Set the base URL to "{{baseUrl}}"`).to.match(pattern);
});

pm.test("[get books] path is set to /books", function () {
    const pattern = /\/books$/
    const url = req1.request.url.raw || req1.request.url
    pm.expect(url.trim(),`Fix: Path should be "{{baseUrl}}/books"`).to.match(pattern);
});

/** 2. get fiction books */
const req2 = reqs[1]
pm.test("[get fiction books] is a GET request", function () {
    pm.expect(req2.request.method,"Fix: Change the method to GET method").to.equal("GET");
});
    
pm.test(`[get fiction books] base URL is set to {{baseUrl}}`, function () {
    const pattern = /^{{baseUrl}}/i
    const url = req2.request.url.raw || req2.request.url
    pm.expect(url.trim(),`Fix: Set the base URL to "{{baseUrl}}"`).to.match(pattern);
});

pm.test("[get fiction books] path is set to /books", function () {
    const pattern = /\/books\??/
    const url = req2.request.url.raw || req2.request.url
    pm.expect(url.trim(),`Fix: Path should be "{{baseUrl}}/books"`).to.match(pattern);
});

pm.test("[get fiction books] Check Query Params", function () {
    const condition = req2.request.url.query.some(q => q.key === 'genre' && q.value.match(/fiction/i)) && req2.request.url.query.some(q => q.key === 'checkedOut' && q.value.match(/false/i))
    pm.expect(condition,`Fix: There should be 2 Query Params
 "genre=fiction" and "checkedOut=false"`).to.equal(true);
});

/** 3. get book by id */
const req3 = reqs[2]
pm.test("[get book by id] Is a GET request", function () {
    pm.expect(req3.request.method,"Fix: Change the method to GET method").to.equal("GET");
});

pm.test(`[get book by id] base URL is set to {{baseUrl}}`, function () {
    const pattern = /^{{baseUrl}}/i
    const url = req3.request.url.raw || req3.request.url
    pm.expect(url.trim(),`Fix: Set the base URL to "{{baseUrl}}"`).to.match(pattern);
});

pm.test(`[get book by id] path is set to /books/:id`, function () {
    const pattern = /\/books\/:id$/
    const url = req3.request.url.raw || req3.request.url
    pm.expect(url.trim(),`Fix: Path should be "{{baseUrl}}/books/:id"`).to.match(pattern);
});

/** 4. add a book */
const req4 = reqs[3]
pm.test("[add a book] is a POST request", function () {
    pm.expect(req4.request.method,"Fix: Change the method to POST method").to.equal("POST");
});

pm.test(`[add a book] Base URL is set to {{baseUrl}}`, function () {
    const pattern = /^{{baseUrl}}/i
    const url = req4.request.url.raw || req4.request.url
    pm.expect(url.trim(),`Fix: Set the base Url to {{baseUrl}}`).to.match(pattern);
});

pm.test(`[add a book] path is set to /books`, function () {
    const pattern = /\/books$/
    const url = req4.request.url.raw || req4.request.url
    pm.expect(url.trim(),`Fix: Set the base URL to "{{baseUrl}}"`).to.match(pattern);
});

pm.test(`[add a book] has a JSON body with title, author, genre, yearPublished`, function () {
    const b = JSON.parse(req4.request.body.raw)
    pm.expect(b,`Fix: add JSON body`).to.have.property('title');
    pm.expect(b).to.have.property('author');
    pm.expect(b).to.have.property('genre');
    pm.expect(b).to.have.property('yearPublished');
});

pm.test(`[add a book] has post-request script in Scripts tab`, function () {
    pm.expect(req4.event.length,"Fix: Script is missing").to.be.greaterThan(0);
});

 /** 5. checkout a book */
const req5 = reqs[4]
pm.test("[checkout a book] is a PATCH request", function () {
    pm.expect(req5.request.method,"Fix: Change the method to PATCH method").to.equal("PATCH");
});

pm.test(`[checkout a book] base URL is set to {{baseUrl}}`, function () {
    const pattern = /^{{baseUrl}}/i
    const url = req5.request.url.raw || req5.request.url
    pm.expect(url.trim(),`Fix: Set the base URL to "{{baseUrl}}"`).to.match(pattern);
});

pm.test(`[checkout a book] path is set to /books/:id`, function () {
    const pattern = /\/books\/:id$/
    const url = req5.request.url.raw || req5.request.url
    pm.expect(url.trim(),`Fix: Path should be "{{baseUrl}}/books/:id"`).to.match(pattern);
});

/** 6. delete a book */
const req6 = reqs[5]
console.log(req6)
pm.test("[delete a book] is a DELETE request", function () {
    pm.expect(req6.request.method,`Fix: Change the method to DELETE method`).to.equal("DELETE");
});

pm.test(`[delete a book] base URL is set to {{baseUrl}}`, function () {
    const pattern = /^{{baseUrl}}/i
    const url = req6.request.url.raw || req6.request.url
    pm.expect(url.trim(),`Fix: Set the base URL to "{{baseUrl}}"`).to.match(pattern);
});

pm.test(`[delete a book] path is set to /books/:id`, function () {
    const pattern = /\/books\/:id$/
    const url = req6.request.url.raw || req6.request.url
    pm.expect(url.trim(),`Fix: Path should be "{{baseUrl}}/books/:id"`).to.match(pattern);
});

/** Collection */
pm.test(`[COLLECTION] Collection level Auth is set to API Key`, function () {
    console.log(body.auth)
    pm.expect(body.auth.type,`Fix: Set collection level auth api-key:postmanrulz`).to.equal(`apikey`);
    /** account for collection v2 and v2.1 schema differences for auth */
    if (body.auth.apikey.key) {
        pm.expect(body.auth.apikey.key).to.equal(`api-key`,`Fix: Set collection level auth api-key`);
        } else {
        pm.expect(body.auth.apikey.some(o => o.value === 'api-key'),`Fix: Set collection level auth api-key`).to.equal(true);
        }
});

/** [skillcheck] */
const req7 = reqs[6]

//** [skillcheck] 1. Used POST as the request method */
pm.test("1. [skillcheck] Used POST as the request method", function () {
    pm.expect(req7.request.method,`Fix: Change the method to POST method`).to.equal("POST");
});

//** [skillcheck] 2. Used a query parameter called “movieName" */
pm.test(`2. [skillcheck] Used a query parameter called 'movieName'`, function () {
    const condition = req7.request.url.query.some(q => q.key === 'movieName');
    pm.expect(condition,`Fix: Add movieName as Query Parameter `).to.equal(true);
});

// ** [skillcheck] 3. Used a base URL variable called {{skillcheckBaseUrl}} */
pm.test(`3. [skillcheck] Used a base URL variable called \{\{skillcheckBaseUrl\}\}`, function () {
    const pattern = /^{{skillcheckBaseUrl}}/i
    const url = req7.request.url.raw || req7.request.url
    pm.expect(url.trim(),`Fix: Variable name should be {{skillcheckBaseUrl}}`).to.match(pattern);
});

// ** [skillcheck] 4. Set request auth to “API key” & header to “student-expert */
pm.test(`4. [skillcheck] Set request level auth to “API key”`, function () {
    pm.expect(req7.request.auth.type).to.equal('apikey')
    const keyObject = req7.request.auth.apikey.filter(item => item.key === "key")[0];
    pm.expect(keyObject.value,`Fix: Request Level auth should be API Key`).to.match(/student-expert/i)
});

//** [skillcheck] 5. Used a JSON body with 'actorName' */
pm.test(`5. [skillcheck] Used a JSON body with 'actorName; `, function () {
    const b = JSON.parse(req7.request.body.raw)
    pm.expect(b,`Fix: Add JSON body to the request`).to.have.property("actorName");
});

// ** [skillcheck] 6. Set "favoriteActor" as a collection variable using pm.collectionVariables.set(...) in  Tests tab script */
pm.test(`6. [skillcheck] Set "favoriteActor" as a collection variable using scripting`, function () {
    const studentScript = req7.event.filter(s => s.listen === 'test')[0].script.exec.join("\n")
    const pattern = /pm\.collectionVariables\.set\(["'`]favou?riteActor["'`]/
    pm.expect(studentScript,`Fix: Save actorName value from response to variable named favoriteActor`).to.match(pattern);
});
