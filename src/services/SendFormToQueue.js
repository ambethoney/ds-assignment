/**
* Send our form data to our server to be parsed and sent to our MessageBroker
*
* @param  {string} payload   Users' data
*/

export const sendFormToQueue = (payload) => {
  fetch('/users', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};
