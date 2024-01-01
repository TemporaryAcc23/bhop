import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import createScore from '@wasp/actions/createScore';
import getUserScores from '@wasp/queries/getUserScores';
import getTopScores from '@wasp/queries/getTopScores';

export function Game() {
  const [distance, setDistance] = useState(0);
  const createScoreFn = useAction(createScore);
  const { data: userScores } = useQuery(getUserScores);
  const { data: topScores } = useQuery(getTopScores);

  useEffect(() => {
    // Replace this with actual game logic
    const interval = setInterval(() => {
      setDistance((prevDistance) => prevDistance + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSaveScore = () => {
    createScoreFn({ distance });
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Bhopping Game</h1>
      <p className='mb-2'>Distance: {distance} meters</p>
      <div className='flex gap-4 mb-4'>
        <button
          onClick={handleSaveScore}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Save Score
        </button>
        <Link
          to='/scores'
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          View Scores
        </Link>
      </div>
      <h2 className='text-xl font-bold mb-2'>Your Scores</h2>
      {userScores && userScores.length > 0 ? (
        <ul className='list-disc list-inside'>
          {userScores.map((score) => (
            <li key={score.id}>{score.distance} meters</li>
          ))}
        </ul>
      ) : (
        <p>No scores yet.</p>
      )}
      <h2 className='text-xl font-bold mt-4 mb-2'>Top Scores</h2>
      {topScores && topScores.length > 0 ? (
        <ul className='list-disc list-inside'>
          {topScores.map((score) => (
            <li key={score.id}>{score.distance} meters</li>
          ))}
        </ul>
      ) : (
        <p>No scores yet.</p>
      )}
    </div>
  );
}