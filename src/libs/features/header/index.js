import { Box, Typography } from "@mui/material";
import React from "react";

function getAvgSumData(tableSumObj, key) {
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

export default function Header({ tableSumObj }) {
  return (
    <>
      {Object.keys(tableSumObj).map((key) => {
        const {
          sumOfGood,
          sumOfNeedImprovement,
          sumOfPoor,
          avgOfGood,
          avgOfNeedImprovement,
          avgOfPoor,
        } = getAvgSumData(tableSumObj, key);
        return (
          <Box
            sx={{
              m: "10px",
              width: "100%",
              fontWeight: "bold",
            }}
            key={key}
          >
            <Typography variant="h6" sx={{ my: 2 }}>
              {key}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 2,
              }}
            >
              <Typography>Sum</Typography>
              <Typography
                sx={{
                  fontWeight: " bold",
                  color: "green",
                }}
              >
                Good: {Math.floor(sumOfGood)}
              </Typography>
              <Typography
                sx={{
                  fontWeight: " bold",
                  color: "orange",
                }}
              >
                NeedImprovement: {Math.floor(sumOfNeedImprovement)}
              </Typography>
              <Typography
                sx={{
                  fontWeight: " bold",
                  color: "red",
                }}
              >
                Poor: {Math.floor(sumOfPoor)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
              }}
            >
              <Typography>Avg.</Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: `${avgOfGood}% ${avgOfNeedImprovement}% ${avgOfPoor}%`,
                  gap: 1,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "green",
                    height: "23px",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "center",
                    fontSize: "15px",
                    color: "white",
                  }}
                >{`${avgOfGood}%`}</Box>
                <Box
                  sx={{
                    backgroundColor: "orange",
                    height: "23px",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "center",
                    fontSize: "15px",
                  }}
                >{`${avgOfNeedImprovement}%`}</Box>
                <Box
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    height: "23px",
                    borderRadius: "5px",
                    width: "100%",
                    textAlign: "center",
                    fontSize: "15px",
                  }}
                >{`${avgOfPoor}%`}</Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  );
}
