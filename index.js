const puppetteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppetteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.hotstar.com/movies/languages/tamil');
    await page.waitFor(10000);
    
    const result = await page.evaluate(() => {
        var links = [], names = [], data = [];
        document.querySelector('.resClass').querySelectorAll("div[class='']").forEach(function(div){
            if(div.className != "") return ;
            let an = div.querySelector(".ripple").getElementsByTagName('a')[0];
            if(!an) return;
            links.push(an.href);
            names.push(an.querySelector(".title").firstChild.innerText);
        });
        for(var i=0;i<names.length;i++){
            data.push({
                names: names[i],
                links: links[i]
            });
        }
        return data;
    });
    browser.close();
    return result;
}

scrape().then((value) => {
    console.log(value);
})