import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Stages.css';
import passage1Img from '../Assets/images/img1.jpg';
import passage2Img from '../Assets/images/img2.jpg';
import passage3Img from '../Assets/images/img3.jpg';
import passage4Img from '../Assets/images/img4.jpg';
import passage5Img from '../Assets/images/img5.jpg';
import { useAuth } from '../Context/AuthContext';
import { db } from '../Firebase/FirebaseConfig';

function Stages() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedPassage, setSelectedPassage] = useState(null);
  const [completedActivities, setCompletedActivities] = useState({
    Passage1: {},
    Passage2: {},
    Passage3: {},
    Passage4: {},
    Passage5: {},
  });

  const [websiteStatus, setWebsiteStatus] = useState({
    Passage1: false,
    Passage2: false,
    Passage3: false,
    Passage4: false,
    Passage5: false,
  });

  const stages = ['Passage1', 'Passage2', 'Passage3', 'Passage4', 'Passage5'];

  const passages = {
    Passage1: [
      { name: 'website', img: passage1Img },
      { name: 'Vocabulary', img: passage2Img },
      { name: 'Fill in the blanks', img: passage4Img },
      { name: 'Jumbled words', img: passage3Img },
      { name: 'Spelling', img: passage5Img },
    ],
    Passage2: [
      { name: 'website', img: passage1Img },
      { name: 'Vocabulary', img: passage2Img },
      { name: 'Fill in the blanks', img: passage3Img },
      { name: 'Jumbled words', img: passage4Img },
      { name: 'Spelling', img: passage5Img },
    ],
    Passage3: [
      { name: 'website', img: passage1Img },
      { name: 'Vocabulary', img: passage2Img },
      { name: 'Fill in the blanks', img: passage3Img },
      { name: 'Jumbled words', img: passage4Img },
      { name: 'Spelling', img: passage5Img },
    ],
    Passage4: [
      { name: 'website', img: passage1Img },
      { name: 'Vocabulary', img: passage2Img },
      { name: 'Fill in the blanks', img: passage3Img },
      { name: 'Jumbled words', img: passage4Img },
      { name: 'Spelling', img: passage5Img },
    ],
    Passage5: [
      { name: 'website', img: passage1Img },
      { name: 'Vocabulary', img: passage2Img },
      { name: 'Fill in the blanks', img: passage3Img },
      { name: 'Jumbled words', img: passage4Img },
      { name: 'Spelling', img: passage5Img },
    ],
  };

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const userDocRef = db.collection('score').doc(user.uid);
        const doc = await userDocRef.get();
        if (doc.exists) {
          const data = doc.data();
          const fetchedScores = data.scores || [];

          const updatedCompletedActivities = { ...completedActivities };

          fetchedScores.forEach(score => {
            const { passage, activity } = score;
            if (passage && activity) {
              const trimmedPassage = passage.trim();
              const matchedStage = stages.find(stage => trimmedPassage.toLowerCase() === stage.toLowerCase());
              if (matchedStage) {
                if (!updatedCompletedActivities[matchedStage]) {
                  updatedCompletedActivities[matchedStage] = {};
                }
                updatedCompletedActivities[matchedStage][activity] = true;
              }
            }
          });

          setCompletedActivities(updatedCompletedActivities);
        }
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    const fetchWebsiteStatus = async () => {
      try {
        const updatedWebsiteStatus = { ...websiteStatus };

        for (const stage of stages) {
          const passageCollectionName = stage.toLowerCase(); // Assuming collection names are lowercase like 'passage1', 'passage2', etc.
          const passageDocRef = db.collection(passageCollectionName).doc(user.uid);
          const doc = await passageDocRef.get();
          if (doc.exists) {
            const data = doc.data();
            if (data.status === 'completed') {
              updatedWebsiteStatus[stage] = true;
            }
          }
        }

        setWebsiteStatus(updatedWebsiteStatus);
      } catch (error) {
        console.error("Error fetching passage status:", error);
      }
    };

    fetchScores();
    fetchWebsiteStatus();
  }, [user.uid]);

  const handleStageClick = (stage) => {
    setSelectedStage(stage === selectedStage ? null : stage);
    setSelectedPassage(null);
  };

  const handlePassageClick = (passageName) => {
    setSelectedPassage(passageName);

    const navigationRoutes = {
      Passage1: {
        website: "/website",
        Vocabulary: "/Vocabulary",
        "Fill in the blanks": "/FillInTheBlank",
        "Jumbled words": "/Jumblewords",
        Spelling: "/Spelling"
      },
      Passage2: {
        website: "/website2",
        Vocabulary: "/Vocabulary2",
        "Fill in the blanks": "/FillInTheBlank2",
        "Jumbled words": "/Jumblewords2",
        Spelling: "/Spelling2"
      },
      Passage3: {
        website: "/website3",
        Vocabulary: "/Vocabulary3",
        "Fill in the blanks": "/FillInTheBlank3",
        "Jumbled words": "/Jumblewords3",
        Spelling: "/Spelling3"
      },
      Passage4: {
        website: "/website4",
        Vocabulary: "/Vocabulary4",
        "Fill in the blanks": "/FillInTheBlank4",
        "Jumbled words": "/Jumblewords4",
        Spelling: "/Spelling4"
      },
      Passage5: {
        website: "/website5",
        Vocabulary: "/Vocabulary5",
        "Fill in the blanks": "/FillInTheBlank5",
        "Jumbled words": "/Jumblewords5",
        Spelling: "/Spelling5"
      },
    };

    const currentStageRoutes = navigationRoutes[selectedStage];
    if (currentStageRoutes && currentStageRoutes[passageName]) {
      navigate(currentStageRoutes[passageName]);
    }
  };

  const areAllActivitiesGreen = (stage) => {
    const stageActivities = passages[stage].map(passage => passage.name);
    return stageActivities.every(activity => completedActivities[stage][activity] || (activity === 'website' && websiteStatus[stage]));
  };

  const isGreen = (stage, activity) => {
    if (activity === 'website' && websiteStatus[stage]) {
      return true;
    }
    return completedActivities[stage] && completedActivities[stage][activity];
  };

  const isStageEnabled = (stageIndex) => {
    if (stageIndex === 0) return true; // First stage is always enabled

    // Enable the current stage only if the previous stage is fully completed
    const previousStage = stages[stageIndex - 1];
    return areAllActivitiesGreen(previousStage);
  };

  return (
    <div className="card-container">
      {stages.map((stage, index) => (
        <div className="stage-container" key={index}>
         <button
  className={`stage-button ${areAllActivitiesGreen(stage) ? 'green-filter' : ''} ${!isStageEnabled(index) ? 'disabled-button' : ''}`}
  onClick={() => handleStageClick(stage)}
  disabled={!isStageEnabled(index)}
>
  {stage}
</button>

          {selectedStage === stage && (
            <div className="passage-structure">
              <div className="passage-row">
                {passages[stage]?.map((passage, idx) => {
                  const greenFilter = isGreen(stage, passage.name) ? 'green-filter' : '';

                  return (
                    <div key={idx}>
                      <div
                        className={`passage-item ${greenFilter}`}
                        onClick={() => handlePassageClick(passage.name)}
                      >
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
