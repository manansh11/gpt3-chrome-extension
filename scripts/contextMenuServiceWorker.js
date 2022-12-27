
const getKey = () => {
    return new Promise((resolve, reject) => {
        // search the storage -- callback with whatever we find
        chrome.storage.local.get(['openai-key'], (r) => {
            // if an encoded value exists
            if(r['openai-key']){
                // decode it
                const decoded = atob(r['openai-key'])
                // send it to promiser
                resolve(decoded)
            }
        })
    })
}

const generate = async (prompt) => {
    const key = await getKey();
    const url = 'https://api.openai.com/v1/completions';

    const completionsResponse = await fetch(url, {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 1000,
            temperature: 0.9,
        }),
    });

    const completion = await completionsResponse.json()
    return completion.choices.pop();
}



const generateCompletedAction = async (i) => {
    try {
        const {selectionText} = i;
        const basePrompt = `
        We are currently in conversation with the Hindu god Krishna. He gives detailed, and enlightened answers to every question. His answers are similar to the answers he gave Arjuna on the battlefield of Kurukshetra
        Me: 
        
        `;
        const baseComplete = await generate(`${basePrompt}${selectionText}`)

    } catch (error) {
        console.error(error)
    }
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'context-run',
        title: 'Generate krishna lesson',
        contexts: ['selection'],
    })
})


chrome.contextMenus.onClicked.addListener(generateCompletedAction)