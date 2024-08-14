

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import '../../Styles/Stages.css';
import passage1Img from '../Assets/images/img1.jpg';
import passage2Img from '../Assets/images/img2.jpg';
import passage3Img from '../Assets/images/img3.jpg';
import passage4Img from '../Assets/images/img4.jpg';
import passage5Img from '../Assets/images/img5.jpg';

function Stages() {
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedPassage, setSelectedPassage] = useState(null);

  const stages = ['stage0', 'stage1', 'stage2', 'stage3', 'stage4'];

  const passages = {
    'stage0': [
      { name: 'passage1', img: passage1Img },
      { name: 'passage2', img: passage2Img },
      { name: 'passage3', img: passage3Img },
      { name: 'passage4', img: passage4Img },
      { name: 'passage5', img: passage5Img }
    ],
    'stage1': [
      { name: 'passage1', img: passage1Img },
      { name: 'passage2', img: passage2Img },
      { name: 'passage3', img: passage3Img },
      { name: 'passage4', img: passage4Img },
      { name: 'passage5', img: passage5Img }
    ],
    // Add other stages with corresponding passages
  };

  const passageToPage = {
    'passage1': 1,
    'passage2': 2,
    'passage3': 3,
    'passage4': 4,
    'passage5': 5,
  };

  const handleStageClick = (stage) => {
    setSelectedStage(stage === selectedStage ? null : stage);
    setSelectedPassage(null);
  };

  const handlePassageClick = (passageName) => {
    setSelectedPassage(passageName);
    navigate('/website', { state: { passageIndex: passageToPage[passageName] } });
  };

  return (
    <div className="card-container">
      {stages.map((stage, index) => (
        <div  className="stage-container" key={index}>
          <button className="stage-button" onClick={() => handleStageClick(stage)}>{stage}</button>
          {selectedStage === stage && (
            <div className="passage-structure">
               <div className="passage-row">
              {passages[stage].map((passage, idx) => (
                // <div className="passage-item" key={idx}>
                //   <button onClick={() => handlePassageClick(passage.name)}>{passage.name}</button>
                //   <img src={passage.img} alt={passage.name} />
                // </div>
                 <div className="passage-item" key={index} onClick={() => handlePassageClick(passage.name)}>
                 <img src={passage.img} alt={passage.name} />
                 {index < passages[stage].length - 1 && <div className="connection-line"></div>}
               </div>
              ))}
            </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Stages;

