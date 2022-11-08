
// send a postgresql query, receive a json response
async function sendQuery(query) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query })
  };
  
  console.log(`sending query "${query}" to server`);
  return new Promise((resolve) => {
    fetch('http://localhost:5000/db/query', requestOptions)
      .then(response => response.json())
      .then(data => {
        //console.log(JSON.stringify(data));
        resolve(data);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

// send a postgresql update, receive success json
async function sendUpdate(query) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query })
  };
  
  console.log(`sending query "${query}" to server`);
  return new Promise((resolve) => {
    fetch('http://localhost:5000/db/update', requestOptions)
      .then(response => response.json())
      .then(data => {
        //console.log(JSON.stringify(data));
        resolve(data);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

export {sendQuery, sendUpdate};