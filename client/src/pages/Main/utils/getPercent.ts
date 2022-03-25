const isPossibleDivide = (total: number) => {
  return total !== 0;
};

function getPercent({total, assigned}: {total: number; assigned: number}) {
  let percent = 0;
  if (isPossibleDivide(total)) {
    percent = (assigned / total) * 100;
  }
  return percent;
}

export default getPercent;
