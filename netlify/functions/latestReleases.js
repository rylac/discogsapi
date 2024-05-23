const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { label_id } = event.queryStringParameters;
  const consumerKey = 'YOUR_CONSUMER_KEY';
  const consumerSecret = 'YOUR_CONSUMER_SECRET';

  if (!label_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Label ID is required' }),
    };
  }

  const url = `https://api.discogs.com/labels/${label_id}/releases?sort=year&sort_order=desc&per_page=5&key=${consumerKey}&secret=${consumerSecret}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
