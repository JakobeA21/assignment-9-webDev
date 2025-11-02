console.log("script.js loaded");
const endpoint = 'https://api.giphy.com/v1/gifs/search?api_key=CZ2pUyYBDn0FgziImpa57p10bXLDWHGr&q=dogs&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips'
// API key
const API_KEY = 'CZ2pUyYBDn0Fgzilmpa57p10bXLDWHGr';

// Get references to DOM elements
const gifContainer = document.querySelector('#gif-container');
const fetchButton = document.querySelector('#fetch-gif-btn');
const searchInput = document.querySelector('#search-input');

// Function to fetch GIFs from Giphy API
async function fetchGifs() {
  try {
    // Get the search term from input field, or use default 'cats'
    const searchTerm = searchInput.value.trim() || 'cats';
    
    // Build the API endpoint with the search term
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=25`;    
    // Send the fetch request and wait for response
    const response = await fetch(endpoint);
    
    // Convert response to JSON
    const data = await response.json();
    
    // Extract image URLs from the response
    const images = data.data.map(gif => gif.images.original.url);
    
    // Log the data to console for debugging
    console.log('Fetched GIFs:', images);
    
    // Clear previous GIFs
    gifContainer.innerHTML = '';
    
    // Display GIFs on the page
    images.forEach(imageUrl => {
      gifContainer.innerHTML += `<img src="${imageUrl}" class="col-3 mb-3" alt="GIF">`;
    });
    
  } catch (error) {
    console.error('Error fetching GIFs:', error);
    gifContainer.innerHTML = '<p class="text-danger">Error loading GIFs. Please try again.</p>';
  }
}

// Add event listener to button
fetchButton.addEventListener('click', async function() {
  // Show loading message
  gifContainer.innerHTML = '<p>Loading GIFs...</p>';
  
  // Fetch and display GIFs
  await fetchGifs();
});

// Optional: Allow Enter key to trigger search
searchInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    fetchButton.click();
  }
});
