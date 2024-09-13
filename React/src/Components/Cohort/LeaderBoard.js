import React, { useEffect, useState } from 'react';
import { db } from '../../Components/Firebase/FirebaseConfig';
import '../../Styles/LeaderBoard.css';

const LeaderBoard = () => {
  const [scores, setScores] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchScoresDetails = async () => {
      try {
        const scoresCollection = await db.collection('score').get();
        const scoresData = scoresCollection.docs.map(doc => ({
          id: doc.id,
          scores: doc.data().scores || []
        }));

        const allScores = scoresData.flatMap(scoreDoc =>
          (scoreDoc.scores || []).map(score => ({
            ...score,
            userId: scoreDoc.id,
            startTime: score.startTime || new Date().getTime() // Ensure we have a start time
          }))
        );

        // Sort by highest score and then by recent start time
        allScores.sort((a, b) => {
          if (b.correctAnswers === a.correctAnswers) {
            return b.startTime - a.startTime; // Sort by recent start time if scores are the same
          }
          return b.correctAnswers - a.correctAnswers; // Sort by highest score
        });

        setScores(allScores); // Store all scores

        const userIds = Array.from(new Set(allScores.map(score => score.userId)));

        const userPromises = userIds.map(id =>
          db.collection('users').doc(id).get().then(userDoc => {
            if (userDoc.exists) {
              return { id: id, name: userDoc.data().name, studentId: userDoc.data().id, mobile: userDoc.data().mobile };
            } else {
              return { id: id, name: 'Unknown', studentId: 'Unknown' };
            }
          })
        );

        const usersData = await Promise.all(userPromises);
        const usersMap = usersData.reduce((acc, user) => {
          acc[user.id] = { name: user.name, studentId: user.studentId, mobile: user.mobile };
          return acc;
        }, {});

        setUserNames(usersMap);

      } catch (error) {
        console.error("Error fetching Scores or Users:", error);
      }
    };

    fetchScoresDetails();
  }, []);

  const displayedScores = showAll ? scores : scores.slice(0, 3);

  return (
    <div className="leaderboard-container">
      <h2 className='leaderboard-heading'>Weekly Leaderboard</h2>
      <p className='leaderboard-subheading'>Refreshes every Monday.</p>
      <div className='cards-container'>
        {displayedScores.map((score, index) => (
          <div className='score-card' key={`${score.userId}-${index}`}>
            <div className='score-card-rank'> {index + 1} </div>
            <div className='score-card-avatar'>
              <div className='avatar-circle'>
                {userNames[score.userId]?.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div className='score-card-content'>
              <p className='score-card-name'>{userNames[score.userId]?.name || 'Unknown'}</p>
              <p className='score-card-points'>{score.correctAnswers} pts</p>
            </div>
          </div>
        ))}
      </div>
      <div className='toggle-button-container'>
        {!showAll && scores.length > 3 && (
          <button className='toggle-button' onClick={() => setShowAll(true)}>
            Read More...
          </button>
        )}
        {showAll && (
          <button className='toggle-button' onClick={() => setShowAll(false)}>
            Read Less
          </button>
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;
