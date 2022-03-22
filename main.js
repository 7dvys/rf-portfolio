// Github Api Rest :D

var repos = new Array;
var currentProject = new Array;
currentProject.html_url = 0;

fetch('https://api.github.com/users/7dvys/repos')
    .then(response => response.json())
    .then(data =>{
        for (let index = 0; index < data.length; index++) {
            let currentData=data[index];
            repos[index]={
                name:currentData.name,
                html_url:currentData.html_url,
                url:currentData.url,    
                description:currentData.description,
                updated_at:currentData.updated_at
            }

            if(currentData.has_pages == true){
                repos[index].page_url='https://'+currentData.owner.login+'.github.io/'+currentData.name;
            }

            if (repos[index].updated_at.localeCompare(currentProject.html_url) == 1) {
                currentProject=repos[index];
            }

            fetch(currentData.languages_url)
                .then(response => response.json())
                .then(data => repos[index].languages=data)
        }


    }).then(()=>{
        // Current Project
        document.querySelector("a.currentProject").setAttribute('href',currentProject.html_url);

        // Genesis Cards
        let cards = document.querySelector('#work .cards');
        for (let index = 0; index < 3; index++) {
            if(index==0){
                // Generar currentProject
                let repo = currentProject;
                let card = cards.querySelector('.card');
                card.querySelector('h4').innerHTML= repo.name;
                card.querySelector('p').innerHTML= repo.description;
                if(repo.languages){
                    card.querySelector('span').innerHTML= Object.keys(repo.languages).join(' · ');
                }
                let pageLink = '';
                if (repo.page_url) {
                    pageLink = '<a href="'+ repo.page_url+'" target="_blank">page</a>';
                }
                card.querySelector('.links').innerHTML= pageLink+'<a href="'+ repo.html_url+'" target="_blank">git</a>';
            }
            else{

                let randCardIndex = Math.floor(Math.random()*(repos.length+1));
                console.log(randCardIndex);
                let repo = repos[randCardIndex];
                let newCard = document.createElement('div');
                newCard.classList.add('card');

                console.log(repo);
                // Generar aleatorio entre todos los repos
                let h4 = document.createElement('h4');
                h4.innerHTML = repo.name;
                newCard.appendChild(h4);

                let p=document.createElement('p');
                p.innerHTML=repo.description;
                newCard.appendChild(p);

                let span=document.createElement('span');
                if(repo.languages){
                    span.innerHTML= Object.keys(repo.languages).join(' · ');
                    newCard.appendChild(span);
                }


                let pageLink = '';
                if (repo.page_url) {
                    pageLink = '<a href="'+ repo.page_url+'" target="_blank">page</a>';
                }

                let links = document.createElement('div');
                links.classList.add('links');
                links.innerHTML= pageLink+'<a href="'+ repo.html_url+'" target="_blank">git</a>';
                newCard.appendChild(links);
                
                cards.appendChild(newCard);
            }
        }
    })
    
    // Descargar imagen
    // fetch(currentData.url+'/contents/portfolioBackground.webp')
    // .then(response => {if(response.ok){return response.json()}})
    // .then(data => {
    //     repos[index].background_url=data.download_url;
    // })    

