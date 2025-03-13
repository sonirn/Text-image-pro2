const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { text } = JSON.parse(event.body);
  const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2";
  const headers = {
    Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ inputs: text }),
    });

    if (response.ok) {
      const buffer = await response.buffer();
      return {
        statusCode: 200,
        body: buffer.toString("base64"),
        isBase64Encoded: true,
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Generation failed" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
