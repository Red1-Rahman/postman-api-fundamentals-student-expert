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
