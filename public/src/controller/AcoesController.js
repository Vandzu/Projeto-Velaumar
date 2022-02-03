class AcoesController {
    constructor(){
        this.connectFirebase();
        const database = firebase.firestore();
        this.firestore = database;
        this.getAcoes();
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

        createAcoes(acao) {
            let li = document.createElement('li');
            li.className = "col-3 text-center";
            li.innerHTML = `
            <div class="lin"><h5 class="name">${acao.nome}</h5></div>
            <div class="lin">
                <div class="img-acao" style="background-image: url(${acao.path_img})">

                </div>
            </div>
            <div class="lin">
                <label class="descricao">${acao.descricao}</label>
                <label class="hora">${acao.hora}</label>
                <label class="local">${acao.rua}, ${acao.numero} - ${acao.bairro}</label>
            </div>
            <div class="lin">
            <button rua="${acao.rua}" nome="${acao.nome}" hora="${acao.hora}" numero="${acao.numero}" bairro="${acao.bairro}" descricao="${acao.descricao}" class="participar">
                Participar
            </button>
            </div>
            `
            document.querySelector('.acoes-list').appendChild(li);
            }

        participate(){
            let btns = document.querySelectorAll('.participar');

            for (let i = 0; i < btns.length; i++) {
                btns[i].addEventListener('click', e=>{
                    document.querySelector('.modal-title').innerHTML = btns[i].getAttribute('nome');
                    document.querySelector('.hora2').innerHTML = btns[i].getAttribute('hora');
                    document.querySelector('.descricao2').innerHTML = btns[i].getAttribute('descricao');
                    document.querySelector('.rua').innerHTML = btns[i].getAttribute('rua');
                    document.querySelector('.numero').innerHTML = btns[i].getAttribute('numero');
                    document.querySelector('.bairro').innerHTML = btns[i].getAttribute('bairro');
                    $('#modal-participate').modal('show');
                })

                document.querySelector('.confirmar').addEventListener('click', e=>{
                    window.open(`https://api.whatsapp.com/send?phone=558585794849&text=Olá,+meu+nome+é+{nome+do+usuário},+estou+interessado+em+me+voluntariar+para+a+ação+${document.querySelector('.modal-title').innerHTML}`, "Confirmar voluntariado", "left=100,top=100,width=600px,height=600px")
                })
            }

                
        }

        getAcoes(){
            let countAcoes = 0;
            let collectionRef = this.firestore.collection('Acoes');
            let query = collectionRef.get()
                .then(snapshot => {
                    const sizeAcoes = snapshot.size;

                    snapshot.forEach(doc => {
                        doc.id, '=>', this.createAcoes(doc.data());
                        countAcoes ++;
                    });

                    if(countAcoes===sizeAcoes){this.participate();}
                })
                .catch(err => {
                    console.log('Error getting documents', err);
                });
        }
}

window.app = new AcoesController()