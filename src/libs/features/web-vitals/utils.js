export function getAvgSumData(tableSumObj, key) {
  const sumOfGood = tableSumObj[key].reduce(
    (sum, obj) => sum + obj.goodDensity,
    0
  );
  const sumOfNeedImprovement = tableSumObj[key].reduce(
    (sum, obj) =>
      obj.needsImprovementDensity ? sum + obj.needsImprovementDensity : 0,
    0
  );
  const sumOfPoor = tableSumObj[key].reduce(
    (sum, obj) => sum + obj.poorDensity,
    0
  );
  const avgOfGood = Math.floor(
    tableSumObj[key].reduce((sum, obj) => sum + obj.goodDensity, 0) / 6
  );
  const avgOfNeedImprovement = Math.floor(
    tableSumObj[key].reduce(
      (sum, obj) =>
        obj.needsImprovementDensity ? sum + obj.needsImprovementDensity : 0,
      0
    ) / 6
  );
  const avgOfPoor = Math.floor(
    tableSumObj[key].reduce((sum, obj) => sum + obj.poorDensity, 0) / 6
  );
  return {
    sumOfGood,
    sumOfNeedImprovement,
    sumOfPoor,
    avgOfGood,
    avgOfNeedImprovement,
    avgOfPoor,
  };
}
