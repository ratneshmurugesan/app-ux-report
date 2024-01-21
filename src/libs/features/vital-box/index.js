import { Box, Typography } from "@mui/material";
import React from "react";

const legends = {
  largest_contentful_paint: [
    "Good: <= 2.5s",
    "Needs Improvement: 2.5s - 4s",
    "Poor: > 4s",
  ],
  first_input_delay: [
    "Good: <= 100ms",
    "Needs Improvement: 100ms - 300ms",
    "Poor: > 300ms",
  ],
  cumulative_layout_shift: [
    "Good: <= 0.1",
    "Needs Improvement: 0.1 - 0.25",
    "Poor: > 0.25",
  ],
  first_contentful_paint: [
    "Good: <= 1.8s",
    "Needs Improvement: 0.8s - 3s",
    "Poor: > 3s",
  ],
  interaction_to_next_paint: [
    "Good: <= 200ms",
    "Needs Improvement: 200ms - 500ms",
    "Poor: > 500ms",
  ],
  experimental_time_to_first_byte: [
    "Good: <= 0.8s",
    "Needs Improvement: 0.8s - 1.8s",
    "Poor: > 1.8s",
  ],
};

const indexColorMap = {
  1: "green",
  2: "orange",
  3: "red",
};

export default function VitalBox({ searchData }) {
  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {!!searchData?.metrics
          ? Object.keys(searchData?.metrics).map((key) => {
              const category = searchData?.metrics?.[key].histogram
                ?.map((hObj) => hObj.density)
                .map((value) => Math.floor(value * 100));

              const [good = 0, needsImprovement = 0, poor = 0] = category;

              let percentile = `${parseFloat(
                searchData?.metrics?.[key]?.percentiles.p75 / 1000
              ).toFixed(2)} s`;

              if (key === "cumulative_layout_shift") {
                percentile = `${parseFloat(
                  searchData?.metrics?.[key]?.percentiles.p75 / 1000
                ).toFixed(2)}`;
              }

              return (
                <Box key={key}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>{key}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      {legends?.[key]?.map((str, index) => (
                        <Typography sx={{ color: indexColorMap[index + 1] }}>
                          {str}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
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
                    75th percentile: {percentile}
                  </Box>
                </Box>
              );
            })
          : null}
      </Box>
    </Box>
  );
}
