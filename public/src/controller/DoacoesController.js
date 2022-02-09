class DoacoesController{
    constructor(){
        const database = firebase.firestore();
        this.firestore = database;
        this.collectionRef = this.firestore.collection('Doacoes');
        this.getDoacoes();
    }

    getDoacoes(){
        let countDoacoes = 0;
        this.collectionRef.get()
        .then(snapshot => {
            const sizeDoacoes = snapshot.size;

            snapshot.forEach(doc => {
                doc.id, '=>', this.createDoacoes(doc.data(), doc.id);
                countDoacoes ++;
            });

            if(countDoacoes===sizeDoacoes){this.avancar();}
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    }

    createDoacoes(doacao, id) {
        let li = document.createElement('li');
        li.className = "col-3 doacao text-center";
        li.innerHTML = `
        <div class="lin">
        <b>${doacao.nome}</b>
        </div>
        <div class="lin">
            <label>${doacao.descricao}</label>
        </div>
        <div class="lin">
            <div class="img-doacao" style="background-image: url('${doacao.path_img}')">
            </div>
        </div>
        <div class="lin">
            <button id="${id}" class="avancar">
                Avançar
            </button>
        </div>
        `
        document.querySelector('.list-doacoes').appendChild(li);
        }

    avancar(){
        let btns = document.querySelectorAll('.avancar');
        for (let i = 0; i < btns.length; i++) {
            this.collectionRef.doc(btns[i].id).get().then((doc)=>{
                if(doc.exists){
                    btns[i].addEventListener('click', e=>{
                        document.querySelector('.modal-title').innerHTML = doc.data().nome;
                        document.querySelector('.proposito').innerHTML = doc.data().proposito;
                        document.querySelector('.entrega').innerHTML = doc.data().entrega;
                        document.querySelector('.localizacao').innerHTML = doc.data().rua + ', '+doc.data().numero+' - '+doc.data().bairro;
                        
                        $('#modal-doacao').modal('show');
                }
            
        )}}).catch((error)=>{
            console.log(error);
        })


            document.querySelector('.confirmar').addEventListener('click', e=>{
                window.open(`https://api.whatsapp.com/send?phone=558585794849&text=Olá,+estou+interessado+em+fazer+uma+doação+de+${document.querySelector('.modal-title').innerHTML}+para+o+endereço+${document.querySelector('.localizacao').innerHTML}`, "Confirmar voluntariado", "left=100,top=100,width=600px,height=600px")
                })
            }   
        }
    }   


window.app = new DoacoesController()