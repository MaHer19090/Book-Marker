let nameInput = document.getElementById(`name`);
let urlInput = document.getElementById(`url`);
let btn = document.getElementById(`addBtn`);
let tableBody = document.getElementById(`tableBody`);

let bookmarks;
let mainI = 0;

if(localStorage.getItem(`bookmarks`) === null){
    bookmarks = [];
}else{
    bookmarks=JSON.parse(localStorage.getItem(`bookmarks`))
    display(bookmarks)
}

btn.onclick = function(){
    if(btn.innerHTML == `update`){
        btn.innerHTML = `Submit`
        let bookmark={
            name:nameInput.value,
            url:urlInput.value
        }
        bookmarks.splice(mainI,1,bookmark)

    }else{
        let bookmark = {
        name:nameInput.value,
        url:urlInput.value
    }
    bookmarks.push(bookmark);
}
    localStorage.setItem(`bookmarks`,JSON.stringify(bookmarks))
    display(bookmarks);
    clear()
}

// Display
function display(anyArr){
    let marks=``
    for(let i = 0; i<anyArr.length; i++){
        marks += `
        <tr>
        <td>${anyArr[i].name}</td>
        <td><a href = "${anyArr[i].url}"><button class="btn btn-primary">Visit</button></a></td>
        <td><button onclick="update(${i})" class = "btn btn-info">update</button></td>
        <td><button onclick="delet(${i})" class = "btn btn-danger">delete</button></td>
        </tr>
        `
    }
    tableBody.innerHTML = marks;
}


// Delete
function delet(i){
    bookmarks.splice(i,1)
    localStorage.setItem(`bookmarks`,JSON.stringify(bookmarks))
    display(bookmarks);
}

// clear
function clear(){
    nameInput.value = ``
    urlInput.value = ``
}

// update
function update(i){
    nameInput.value = bookmarks[i].name;
    urlInput.value = bookmarks[i].url;

    btn.innerHTML = `update`
    mainI = i;
}



// Regex
let nameRegex = /^[A-Za-z ]{1,}$/
function isNameValid(){
    if(nameRegex.test(nameInput.value)){
        return true;
    }else{
        return false;
    }
}

let urlRegex = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/
function isUrlValid(){
    if(urlRegex.test(urlInput.value)){
        return true;
    }else{
        return false;
    }
}

nameInput.onkeyup = function(){
    if(isNameValid() && isUrlValid()){
        addBtn.removeAttribute(`disabled`)
    }else{
        addBtn.disabled = `true`;
    }
}

urlInput.onkeyup = function(){
    if(isNameValid() && isUrlValid()){
        addBtn.removeAttribute(`disabled`)
    }else{
        addBtn.disabled = `true`;
    }
}


// Search
function search(term){
    let wantedMark = [];
    for(let i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].name.toLowerCase().includes(term)){
            wantedMark.push(bookmarks[i])
        }
    }
    display(wantedMark)

}