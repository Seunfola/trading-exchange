export const parseUserId = (userId: string | string[] | undefined): number | null => {
  if (!userId || Array.isArray(userId) || isNaN(Number(userId))) {
    return null;
  }
  return Number(userId);
};
