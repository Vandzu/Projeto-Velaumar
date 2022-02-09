class NoticiasController{
    constructor(){
        const database = firebase.firestore();
        this.firestore = database;
        this.collectionRef = this.firestore.collection('Noticias');
        this.getNoticias();
    }

    createNoticias(data, id){
        let noticiaEl = document.createElement('div');
        noticiaEl.className = "col-6 noticia";
        noticiaEl.id = id;
        let href = data.titulo;
        let hreftitle = href.replace(/\s+/g, '');
        console.log(hreftitle);
        noticiaEl.innerHTML = `
            <div class="row">
            <div class="thumb col-3" style="background-image: url(${data.thumb})">
            
            </div>
                <div class="texts col-8">
                    <h3>${data.titulo}</h3>
                    <p class="descricao">
                        ${data.subtitulo}
                    </p>
                    <i class="hora-post">
                        Postado em ${data.hora}
                    </i>
                </div>
            </div>
        `

        document.querySelector('.list-noticias').appendChild(noticiaEl);
        noticiaEl.addEventListener('click', e=>{
            this.renderNoticia(data)
        })
    }

    renderNoticia(data){
            document.querySelector('.list-noticias').innerHTML = '';
            let noticiaOpened = document.createElement('div');
            noticiaOpened.className = 'noticia-opened';
            noticiaOpened.innerHTML =
            `
            <div class="texts text-center mb-3 col-12">
            <h3>${data.titulo}</h3>
            <p class="descricao">
                ${data.subtitulo}
            </p>
            <i class="hora-post">
                Postado em ${data.hora}
            </i>
            </div>
            ${data.conteudo}
            `
            
            document.querySelector('.list-noticias').appendChild(noticiaOpened);
            noticiaOpened.scrollIntoView({block: "start", behavior: "smooth"});
            this.getNoticias();
    }

    getNoticias(){
        let query = this.collectionRef.get()
                .then(snapshot => {
                    let countActions = 0;
                    const numActions = snapshot.size;
                    snapshot.forEach(doc => {
                        doc.id, '=>', this.createNoticias(doc.data(), doc.id);
                        countActions ++;
                    });
                })
                .catch(err => {
                    console.log('Error getting documents', err);
                });
            }
}

window.app = new NoticiasController;