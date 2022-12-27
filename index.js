
const checkForKey = () => {
    // Create a new promise which is returned to whereever its called
    return new Promise((resolve, reject) => {
        // check if there is a value existing for the given key, if so -- return the value
        chrome.storage.local.get(['openai-key'], (r) => {
            resolve(r['openai-key'])
        })
    })
}

const encode = (i) => {
    return btoa(i);
}

// const saveKey = () => {
//     // get input
//     const input = document.getElementById('key_input');
//     // if there is an input, not null
//     if (input){
//         // destructure its value
//         const {value} = input;

//         // encode the value
//         const encodedVal = encode(value);

//         // Save to chrome storage
//         // Set the encoded value as the value to key 'openai-key
//         // Then call back
//         chrome.storage.local.set({'openai-key' : encodedVal}, () => {
//             // Remove the input section
//             document.getElementById('key_needed').style.display = 'none'
//             // Redisplay the change key document
//             document.getElementById('key_entered').style.display = 'block';
//         })
//     }
// }


const saveKey = () => {
    const input = document.getElementById('key_input');
  
    if (input) {
      const { value } = input;
  
      // Encode String
      const encodedValue = encode(value);
  
      // Save to google storage
      chrome.storage.local.set({ 'openai-key': encodedValue }, () => {
        document.getElementById('key_needed').style.display = 'none';
        document.getElementById('key_entered').style.display = 'block';
      });
    }
  };



const changeKey = () => {
    document.getElementById('key_needed').style.display = "block"
    document.getElementById('key_entered').style.display = "none"
}


document.getElementById('save_key_button').addEventListener('click', saveKey);
document.getElementById('change_key_button').addEventListener(
    'click', changeKey
);


checkForKey().then((response) => {
    if(response) {
        document.getElementById('key_needed').style.display = 'none';
        document.getElementById('key_entered').style.display = 'block';
    }
})