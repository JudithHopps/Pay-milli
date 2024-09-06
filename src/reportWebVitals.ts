type Metric = {
  name: string;
  value: number;
  delta: number;
  id: string;
};

import { onCLS, onFID, onFCP, onLCP, onTTFB } from "web-vitals";

const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
