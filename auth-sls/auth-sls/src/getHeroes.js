'use strict';

module.exports.public = async (event) => {
  console.log('Public request...')
  return {
    statusCode: 200,
    body: JSON.stringify(
      [
        {
          id: 1,
          name: "Flash",
          power: "Speed"
        }
      ],
      null,
      2
    ),
  };
};

module.exports.private = async (event) => {
  console.log('Private request...', {user: event.requestContext.authorizer.user})
  return {
    statusCode: 200,
    body: JSON.stringify(
      [
        {
          id: 2,
          name: "Batman",
          power: "Rich"
        }
      ],
      null,
      2
    ),
  };
};
