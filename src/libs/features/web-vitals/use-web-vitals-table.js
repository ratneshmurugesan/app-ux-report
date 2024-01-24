import { useState } from "react";

export const useWebVitalsTable = ({ searchData }) => {
  // const [searchData, setSearchData] = useState(null);
  const [selectedThreshold, setSelectedThreshold] = useState([]);
  const [selectedMetric, setFilterName] = useState([]);

  const handleMetricFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilterName(typeof value === "string" ? value.split(",") : value);
  };

  const handleThresholdFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedThreshold(typeof value === "string" ? value.split(",") : value);
  };

  const metricMap = {
    interactionto_next_paint: "Interaction to Next Paint",
    largestcontentful_paint: "Largest Contentful Paint",
    cumulativelayout_shift: "Cumulative Layout Shift",
    experimentaltime_to_first_byte: "Time to First Byte",
    firstcontentful_paint: "First Contentful Paint",
    firstinput_delay: "First Input Delay",
  };

  let tableObj = {};
  let tableSumObj = {};

  if (searchData && searchData.length > 0) {
    searchData.forEach(({ record }) => {
      const metricObj = record.metrics;

      let tableRow = Object.keys(metricObj)
        .filter((metricKey) => metricKey !== "form_factors")
        .filter((metricKey) => {
          if (!selectedMetric.length) return true;
          return selectedMetric.includes(metricKey);
        })
        .map((metricKey, index) => {
          const unit = metricKey === "cumulative_layout_shift" ? "" : "ms";
          const goodDensity = metricObj[metricKey].histogram?.[0]?.density
            ? Math.floor(metricObj[metricKey].histogram?.[0]?.density * 100)
            : "-";
          const goodDensityStart = metricObj[metricKey].histogram?.[0]?.start
            ? `${metricObj[metricKey].histogram?.[0]?.start}${unit}`
            : "-";
          const goodDensityEnd = metricObj[metricKey].histogram?.[0]?.end
            ? `${metricObj[metricKey].histogram?.[0]?.end}${unit}`
            : "-";

          const needsImprovementDensity = metricObj[metricKey].histogram?.[1]
            ?.density
            ? Math.floor(metricObj[metricKey].histogram?.[1]?.density * 100)
            : "-";
          const needsImprovementDensityStart = metricObj[metricKey]
            .histogram?.[1]?.start
            ? `${metricObj[metricKey].histogram?.[1]?.start}${unit}`
            : "-";
          const needsImprovementDensityEnd = metricObj[metricKey].histogram?.[1]
            ?.end
            ? `${metricObj[metricKey].histogram?.[1]?.end}${unit}`
            : "-";

          const poorDensity = metricObj[metricKey].histogram?.[2]?.density
            ? Math.floor(metricObj[metricKey].histogram?.[2]?.density * 100)
            : "-";
          const poorDensityStart = metricObj[metricKey].histogram?.[2]?.start
            ? `${metricObj[metricKey].histogram?.[2]?.start}${unit}`
            : "-";
          const poorDensityEnd = metricObj[metricKey].histogram?.[2]?.end
            ? `${metricObj[metricKey].histogram?.[2]?.end}${unit}`
            : "-";

          const percentile = metricObj[metricKey].percentiles?.p75
            ? metricObj[metricKey].percentiles?.p75
            : "-";

          return {
            id: `${metricKey}-${index}`,
            metric: metricMap[metricKey.replace("_", "").toLocaleLowerCase()],
            url: record.key.origin,
            goodDensity,
            goodDensityStart,
            goodDensityEnd,
            needsImprovementDensity,
            needsImprovementDensityStart,
            needsImprovementDensityEnd,
            poorDensity,
            poorDensityStart,
            poorDensityEnd,
            percentile,
          };
        })
        .filter((obj) => {
          if (!selectedThreshold) return true;
          return (
            selectedThreshold < obj.goodDensity ||
            selectedThreshold < obj.needsImprovementDensity ||
            selectedThreshold < obj.poorDensity
          );
        })
        .map((obj) => {
          return {
            ...obj,
            goodDensityStartEnd: `(${obj.goodDensityStart} - ${obj.goodDensityEnd})`,
            needsImprovementDensityStartEnd: `(${obj.needsImprovementDensityStart} - ${obj.needsImprovementDensityEnd})`,
            poorDensityStartEnd: `(${obj.poorDensityStart} - ${obj.poorDensityEnd})`,
          };
        });

      let tableSumRow = Object.keys(metricObj)
        .filter((metricKey) => metricKey !== "form_factors")
        .map((metricKey, index) => {
          const goodDensity = metricObj[metricKey].histogram?.[0]?.density
            ? Math.floor(metricObj[metricKey].histogram?.[0]?.density * 100)
            : 0;

          const needsImprovementDensity = metricObj[metricKey].histogram?.[1]
            ?.density
            ? Math.floor(metricObj[metricKey].histogram?.[1]?.density * 100)
            : 0;

          const poorDensity = metricObj[metricKey].histogram?.[2]?.density
            ? Math.floor(metricObj[metricKey].histogram?.[2]?.density * 100)
            : 0;

          const percentile = metricObj[metricKey].percentiles?.p75
            ? metricObj[metricKey].percentiles?.p75
            : 0;

          return {
            id: `${metricKey}-${index}`,
            metric: metricMap[metricKey.replace("_", "").toLocaleLowerCase()],
            url: record.key.origin,
            goodDensity,
            needsImprovementDensity,
            poorDensity,
            percentile,
          };
        });

      tableObj = {
        ...tableObj,
        [record.key.origin]: tableRow,
      };
      tableSumObj = {
        ...tableSumObj,
        [record.key.origin]: tableSumRow,
      };
    });
  }

  console.log({ searchData, tableObj, tableSumObj });

  return {
    searchData,
    tableObj,
    tableSumObj,
    selectedThreshold,
    selectedMetric,
    handleMetricFilterChange,
    handleThresholdFilterChange,
  };
};
