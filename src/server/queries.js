import HttpError from '@wasp/core/HttpError.js'

export const getUserScores = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const user = await context.entities.User.findUnique({
    where: { id: args.userId }
  })

  if (!user) { throw new HttpError(400, 'User not found') }

  const scores = await context.entities.Score.findMany({
    where: { userId: args.userId }
  })

  return scores;
}

export const getTopScores = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const topScores = await context.entities.Score.findMany({
    take: 10,
    orderBy: { distance: 'desc' }
  });

  return topScores;
}