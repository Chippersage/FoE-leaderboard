import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Vocabulary = () => {
  const { user } = useAuth();
  const location = useLocation();
  const passageIndex = location.state?.passageIndex || 1;
  const [url, setUrl] = useState(null);

  const userName = user?.name || 'user';
  const userId = user?.uid || 'unknown';
  const id = 1; // Row ID for which you want to fetch the URL

  useEffect(() => {
    // Store userName and userId in localStorage
    localStorage.setItem('userName', userName);
    localStorage.setItem('userId', userId);

    // Fetch the URL for a specific row
    const fetchRowUrl = async () => {
      try {
        const apiUrl = 'https://iiiqai.com/activity_url/get_URL_API.php'; // API endpoint for fetching

        const response = await fetch(`${apiUrl}?id=${id}`, { // Pass row ID as a query parameter
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        // Log entire response for debugging
        console.log('API Response:', data);

        if (data && data.response === 'success') {
          // Extract the URL from the data array
          if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            const row = data.data.find(row => row.id === id); // Find the row with the matching ID
            if (row && row.url) {
              console.log('Fetched URL successfully:', row.url);
              setUrl(row.url); // Use the URL from the API response
            } else {
              console.error('URL field is missing in the data array for the specified ID.');
            }
          } else {
            console.error('Data field is missing or not an array in the API response.');
          }
        } else {
          console.error('Error fetching the row:', data.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error calling fetch API:', error);
      }
    };

    fetchRowUrl(); // Call the fetch function
  }, [userName, userId, id]);

  useEffect(() => {
    if (url) {
      const iframe = document.getElementById('embeddedContent');
      iframe.onload = () => {
        iframe.contentWindow.postMessage({ type: 'changePage', pageNumber: passageIndex }, '*');
      };
    }
  }, [url, passageIndex]);

  const urlWithUserNameAndId = url ? `${url}?name=${encodeURIComponent(userName)}&uid=${encodeURIComponent(userId)}` : null;

  return (
    <>
      <iframe
        id="embeddedContent"
        src={urlWithUserNameAndId}
        title="Embedded Content"
        width="100%"
        height="800px"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
      />
    </>
  );
};

export default Vocabulary;
