export async function handler(event) {
  const { url } = event.queryStringParameters;

  const response = await fetch(url, {
    headers: {
      "x-api-key": '5ee0cf9c56cbe6dc3ee06d1bacb899d872b9a7858fe48df118743fce993267f5'
    }
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
