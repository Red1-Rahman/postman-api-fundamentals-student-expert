// Parse the JSON response
const jsonData = pm.response.json();

// Check if actorName exists in the response
if (jsonData.json && jsonData.json.actorName) {
    // Save it as a collection variable named "favoriteActor"
    pm.collectionVariables.set("favoriteActor", jsonData.json.actorName);
    console.log("favoriteActor variable set to:", jsonData.json.actorName);
} else {
    console.warn("actorName not found in response");
}
