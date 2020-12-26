console.log("contentScript.js started");

import {getTTFB, getLCP, getFID, getFCP, getCLS} from 'web-vitals'

const infoDiv = document.createElement('div')
infoDiv.style.position = 'fixed'
infoDiv.style.left = 0
infoDiv.style.top = 0
infoDiv.style.zIndex = 3
infoDiv.style.backgroundColor = 'black'
infoDiv.style.color= 'white'
infoDiv.style.padding = '1rem'
infoDiv.style.fontFamily = 'Arial'
infoDiv.style.fontSize = '1.5rem'
document.body.appendChild(infoDiv)

const metrics = {}
const gatherMertics = ({name, value}) => {
    metrics[name] = value

    chrome.runtime.sendMessage({
        type: 'performance:metric',
        name,
        value,
    })

    const metricsHTML = Object.keys(metrics)
    .map((k) => `<div>${k}</div><div>${Math.round(metrics[k])}</div>`)
    .join("");

    infoDiv.innerHTML = `
<div style="font-weight:bold;font-size:x-large">Perf Metrics</div>
<div style="display:grid; grid-template-columns: 1fr 1fr; grid-column-gap: 1rem;">
  <div>Metric</div>
  <div>Value</div>
  ${metricsHTML}
</div>
  `;
}


getTTFB(gatherMertics)
getLCP(gatherMertics)
getFID(gatherMertics)
getFCP(gatherMertics)
getCLS(gatherMertics)

