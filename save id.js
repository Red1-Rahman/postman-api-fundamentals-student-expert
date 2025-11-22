// save the "id" value from the response to a variable named "id"
const id = pm.response.json().id
// save the id as a collection variable named "id"
pm.collectionVariables.set("id", id)
