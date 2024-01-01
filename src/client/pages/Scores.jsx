import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getUserScores from '@wasp/queries/getUserScores';
import getTopScores from '@wasp/queries/getTopScores';

export function ScoresPage() {
  const { data: userScores, isLoading: userScoresLoading, error: userScoresError } = useQuery(getUserScores);
  const { data: topScores, isLoading: topScoresLoading, error: topScoresError } = useQuery(getTopScores);

  if (userScoresLoading || topScoresLoading) return 'Loading...';
  if (userScoresError || topScoresError) return 'Error: ' + (userScoresError || topScoresError);

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Your Scores:</h1>
      <ul className='mb-8'>
        {userScores.map((score) => (
          <li key={score.id}>{score.distance} meters</li>
        ))}
      </ul>
      <h1 className='text-3xl font-bold mb-4'>Top Scores:</h1>
      <ul>
        {topScores.map((score) => (
          <li key={score.id}>{score.distance} meters</li>
        ))}
      </ul>
      <Link to='/'>Go to Game</Link>
    </div>
  );
}