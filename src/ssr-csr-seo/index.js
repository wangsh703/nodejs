const fs = require('fs');
const {JSDOM} = require('jsdom')
const root = new JSDOM(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <ul id="list"></ul>
</head>
<body>
    
</body>
</html>`)
const document = root.window.document

const list = document.querySelector('#list')
fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1').then(res => res.json()).then(res => {
    // console.log('fetch',res);
    const imgs = res.map(item => {
        const img = document.createElement('img')
        img.style.width = '100px'
        img.style.height = '100px'
        img.src = item.url
        return img
    })
    list.append(...imgs)
    fs.writeFileSync('./index.html',root.serialize())
})