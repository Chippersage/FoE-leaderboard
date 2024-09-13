import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { db } from '../Firebase/FirebaseConfig'; // Firebase initialization
import { collection, query, where, getDocs } from 'firebase/firestore';

const Comprehension = () => {
  const { user } = useAuth();
  const location = useLocation();
  const passageIndex = location.state?.passageIndex || 1;
  const [url, setUrl] = useState(null);

  const userName = user?.name || 'user';
  const userId = user?.uid || 'unknown';
  const urlWithUserNameAndId = url ? `${url}?name=${encodeURIComponent(userName)}&uid=${encodeURIComponent(userId)}` : null;

  useEffect(() => {
    // Store userName and userId in localStorage
    localStorage.setItem('userName', userName);
    localStorage.setItem('userId', userId);

    // Fetch the document URL dynamically from Firestore where id = 2
    const fetchDocumentUrl = async () => {
      try {
        const activityCollection = collection(db, 'activity'); // Replace 'activity' with your actual collection name
        const q = query(activityCollection, where('id', '==', 5)); // Query where id is 2
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const documentData = querySnapshot.docs[0].data(); // Fetch the first matching document
          setUrl(documentData.url); // Assume 'url' field exists in the document
        } else {
          console.error('No document with id = 2 found.');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDocumentUrl();
  }, [userName, userId]);

  useEffect(() => {
    if (url) {
      const iframe = document.getElementById('embeddedContent');
      iframe.onload = () => {
        iframe.contentWindow.postMessage({ type: 'changePage', pageNumber: passageIndex }, '*');
      };
    }
  }, [url, passageIndex]);

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

export default Comprehension;
