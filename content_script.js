// Function to fetch completion from OpenAI API
async function fetchCompletion(prompt) {
  const apiKey = 'sk-proj-XvQK4s1Gv0lJMEhbmymiT3BlbkFJ9aridZjBsCvVZDbtthxM';
  const model = 'gpt-3.5-turbo-16k-0613';
  const maxTokens = 50; // Maximum number of tokens in the completion
  
  const requestBody = {
    prompt: prompt,
    model: model,
    max_tokens: maxTokens
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(requestBody)
  };

  try {
    const response = await fetch('https://api.openai.com/v1/completions', requestOptions);
    const data = await response.json();
    return data.choices[0].text.trim();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Function to create a div and append completion text to it
async function createDivWithCompletion() {
  const url = new URL(window.location.href);
  const search = url.search;
  const searchParams = new URLSearchParams(search);
  const q = searchParams.get('q');
  
  // Fetch completion based on the search query
  const completion = await fetchCompletion(q);

  // Create a new div element
  const newDiv = document.createElement("div");

  // Set the content of the div to the completion result
  newDiv.textContent = completion;

  // Set position to absolute bottom
  newDiv.style.position = 'absolute';
  newDiv.style.bottom = '0';
  newDiv.style.left = '0';

  // Append the div to the body of the HTML document
  document.body.appendChild(newDiv);
}

// Call the function to create div with completion
createDivWithCompletion();
