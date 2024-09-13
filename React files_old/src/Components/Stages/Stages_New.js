import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Stages.css';
import passage1Img from '../Assets/images/img1.jpg';
import passage2Img from '../Assets/images/img2.jpg';
import passage3Img from '../Assets/images/img3.jpg';
import passage4Img from '../Assets/images/img4.jpg';
import passage5Img from '../Assets/images/img5.jpg';
import { useAuth } from '../Context/AuthContext';
import { db } from '../Firebase/FirebaseConfig'; // Import your firebase configuration

function Stages() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedPassage, setSelectedPassage] = useState(null);
  const [scores, setScores] = useState([]);

  const stages = ['Passage1', 'Passage2', 'Passage3', 'Passage4', 'Passage5'];

  const passages = {
    'Passage1': [
      { name: 'website', img: passage1Img },
      { name: 'Vocabulary', img: passage2Img },
      // { name: 'Comprehension', img: passage2Img },
      { name: 'Fill in the blanks', img: passage4Img },
      { name: 'Jumbled words', img: passage3Img },
      { name: 'Spelling', img: passage5Img },
    ],
    'Passage2': [
      { name: 'website', img: passage1Img },
      { name: 'Vocabulary', img: passage2Img },
      // { name: 'Comprehension', img: passage2Img },
      { name: 'Fill in the blanks', img: passage3Img },
      { name: 'Jumbled words', img: passage4Img },
      { name: 'Spelling', img: passage5Img },
    ],
    // Add other stages with corresponding passages
  };

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const userDocRef = db.collection('score').doc(user.uid);
        const doc = await userDocRef.get();
        if (doc.exists) {
          const data = doc.data();
          const fetchedScores = data.scores || []; // Default to an empty array if no scores field
          setScores(fetchedScores);
        }
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, [user.uid]);

  const handleStageClick = (stage) => {
    setSelectedStage(stage === selectedStage ? null : stage);
    setSelectedPassage(null);
  };

  const handlePassageClick = (passageName, passageIndex) => {
    setSelectedPassage(passageName);
    const navigationRoutes = {
      "website": "/website",
      "Vocabulary": "/Vocabulary",
      "Fill in the blanks": "/FillInTheBlank",
      "Jumbled words": "/Jumblewords",
      "Spelling": "/Spelling"
    };
    if (navigationRoutes[passageName]) {
      navigate(navigationRoutes[passageName]);
    }
  };

  const isGreen = (activity) => {
    return scores.some(score => score.activity === activity);
  };

  return (
    <div className="card-container">
      {stages.map((stage, index) => (
        <div className="stage-container" key={index}>
          <button className="stage-button" onClick={() => handleStageClick(stage)}>{stage}</button>
          {selectedStage === stage && (
            <div className="passage-structure">
              <div className="passage-row">
                {passages[stage].map((passage, idx) => {
                  const greenFilter = isGreen(passage.name) ? 'green-filter' : '';
                  
                  return (
                    
                    <div>
                      <div className={`passage-item ${greenFilter}`}
                      key={idx}
                      onClick={() => handlePassageClick(passage.name, idx)}>
                      <img src={passage.img} alt={passage.name} />
                      </div>
                      {idx < passages[stage].length - 1 && <div className="connection-line"></div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Stages;
