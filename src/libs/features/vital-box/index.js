import { Box, Typography } from "@mui/material";
import React from "react";

export default function VitalBox({ searchData }) {
  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {!!searchData?.metrics
          ? Object.keys(searchData?.metrics).map((key) => {
              const category = searchData?.metrics?.[key].histogram
                ?.map((hObj) => hObj.density)
                .map((value) => Math.floor(value * 100));

              const [good = 0, needsImprovement = 0, poor = 0] = category;

              const percentiles = `${parseFloat(
                searchData?.metrics?.[key]?.percentiles.p75 / 1000
              ).toFixed(2)} s`;

              return (
                <Box key={key}>
                  <Typography>{key}</Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: `${good}% ${needsImprovement}% ${poor}%`,
                      gap: "2px",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "green",
                        height: "25px",
                        borderRadius: "5px",
                        width: "100%",
                        textAlign: "center",
                        fontSize: "15px",
                        top: "5px",
                        color: "white",
                      }}
                    >{`${good}%`}</Box>
                    <Box
                      sx={{
                        backgroundColor: "orange",
                        height: "25px",
                        borderRadius: "5px",
                        width: "100%",
                        textAlign: "center",
                        fontSize: "15px",
                        top: "5px",
                      }}
                    >{`${needsImprovement}%`}</Box>
                    <Box
                      sx={{
                        backgroundColor: "red",
                        height: "25px",
                        borderRadius: "5px",
                        width: "100%",
                        textAlign: "center",
                        fontSize: "15px",
                        top: "5px",
                      }}
                    >{`${poor}%`}</Box>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    75th percentile: {percentiles}
                  </Box>
                </Box>
              );
            })
          : null}
      </Box>
    </Box>
  );
}
