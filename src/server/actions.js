import HttpError from '@wasp/core/HttpError.js'

export const createScore = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const userId = context.user.id;
  const distance = args.distance;

  return context.entities.Score.create({
    data: {
      distance,
      user: { connect: { id: userId } }
    }
  });
}

export const updateScore = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const score = await context.entities.Score.findUnique({
    where: { id: args.scoreId },
  });
  if (score.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Score.update({
    where: { id: args.scoreId },
    data: { distance: args.distance },
  });
}