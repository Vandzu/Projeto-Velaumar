class NoticiasController {
    constructor(){
        this.connectFirebase();
        const database = firebase.firestore();
        this.firestore = database;
        this.collectionRef = this.firestore.collection('Noticias');
        this.getNoticias();
    }

    connectFirebase() {
        const firebaseConfig = {
            apiKey: "AIzaSyBtJ3R8DWl26qtCXDQvCO0TU3dC5FRjj8s",
            authDomain: "velaumar-c0b81.firebaseapp.com",
            databaseURL: "https://velaumar-c0b81-default-rtdb.firebaseio.com",
            projectId: "velaumar-c0b81",
            storageBucket: "velaumar-c0b81.appspot.com",
            messagingSenderId: "12998876707",
            appId: "1:12998876707:web:c1de580b4006454ecc5b96"
        };
        
        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig);
        }

    createNoticias(data, id){
        let noticiaEl = document.createElement('div');
        noticiaEl.className = "col-6 noticia";
        noticiaEl.id = id;
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
        })
    }

    getNoticias(){
        let query = this.collectionRef.get()
                .then(snapshot => {
                    document.querySelector('.list-noticias').innerHTML = '';
                    let countActions = 0;
                    const numActions = snapshot.size;
                    snapshot.forEach(doc => {
                        doc.id, '=>', this.createNoticias(doc.data(), doc.id);
                        countActions ++;
                    });

                    //if(countActions===numActions){this.createListeners();}
                })
                .catch(err => {
                    console.log('Error getting documents', err);
                });
            }
}

window.app = new NoticiasController;