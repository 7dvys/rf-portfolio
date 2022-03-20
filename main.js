// Github Api Rest :D

var repos = new Array;
fetch('https://api.github.com/users/7dvys/repos')
    .then(response => response.json())
    .then(data =>{
        for (let index = 0; index < data.length; index++) {
            let currentData=data[index];
            repos[index]={
                name:currentData.name,
                html_url:currentData.html_url,
                description:currentData.description,
                languages_url:currentData.languages_url,
                updated_at:currentData.updated_at,
            }

            if(currentData.has_pages == true){
                repos[index].page_url='https://'+currentData.owner.login+'.github.io/'+currentData.name;
            }

            fetch(currentData.languages_url)
                .then(response => response.json())
                .then(data => repos[index].languages=data)

            fetch(currentData.contents.url+'portfolioBackground.webp')
        }

    })

    console.log(repos)
