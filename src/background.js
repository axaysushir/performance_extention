console.log("background.js Started");
const data =  {}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'performance:metric') {
        console.log(request)
        const tab = sender.tab.url.toString()
        data[tab] = data[tab] || {}
        const name = request.name
        data[tab][name] = data[tab][name] || {
            values: [],
            average: 0,
        }
        data[tab][name].values.push(request.value)
        data[tab][name].average = 
            data[tab][name].values.reduce((acc, val) => acc + val, 0) / data[tab][name].values.length;
            console.log(data)
    }

    if (request.type === "performance:metric:request") sendResponse(data)
})