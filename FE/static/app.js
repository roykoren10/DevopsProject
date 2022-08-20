const BACKEND_HOST = 'http://ec2-23-20-250-250.compute-1.amazonaws.com:8000/'

const loadList = () => {
    fetch(BACKEND_HOST + 'list').then(response => response.json())
        .then(data => {
            const list = document.getElementById("sentence-list")
            for (let id in data) {
                sentence = data[id]
                const list = document.getElementById("sentence-list")
                const item = document.createElement("li");
                const item_text = document.createTextNode(sentence + " ");
                const button = document.createElement("button");
                button.setAttribute("type", "button");
                button.setAttribute("onClick", "removeSentence(this)")
                const button_text = document.createTextNode("Remove");
                button.appendChild(button_text)
                item.appendChild(item_text)
                item.appendChild(button)
                list.appendChild(item);
            }
        })
}

const insertSentence = () => {
    let sentence = document.getElementById("insert-input").value
    const list = document.getElementById("sentence-list")
    const item = document.createElement("li");
    const item_text = document.createTextNode(sentence + " ");
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("onClick", "removeSentence(this)")
    const button_text = document.createTextNode("Remove");
    button.appendChild(button_text)
    item.appendChild(item_text)
    item.appendChild(button)
    list.appendChild(item);

    let data = {"sentence": sentence};

    fetch(BACKEND_HOST + 'add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    document.getElementById("insert-input").value = ""
}

const removeSentence = (element) => {
    const li = element.parentElement
    let sentence = (li.childNodes[0].textContent || li.childNodes[0].innerText)
    sentence = sentence.slice(0, -1)
    let data = {"sentence": sentence};

    fetch(BACKEND_HOST + 'remove', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    element.parentElement.remove()
}