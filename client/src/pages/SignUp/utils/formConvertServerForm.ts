export const convertRole = (isAdmin: boolean) => {
  return isAdmin ? 2 : 1;
};

export const convertOs = (osInfo: string | undefined) => {
  return osInfo ? osInfo : 'unkwown';
};
