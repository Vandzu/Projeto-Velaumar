class AdminAcoesController {
    constructor(){
        const database = firebase.firestore();
        this.storage = firebase.storage();
        this.firestore = database;
        this.collectionRef = this.firestore.collection('Acoes');
        this.onselectionchange = new Event("selectionchange");
        this.listFilesEl = document.querySelector('#actions-list');
        this.getAcoes();
        this.createAcao();
    }

        createAcoes(acao, key) {
            let li = document.createElement('li');
            li.className = "col-3 text-center";
            li.id = key;
            let rua = document.createAttribute("rua-attr");
            rua.value = acao.rua;
            let numero = document.createAttribute("numero-attr");
            numero.value = acao.numero;
            let bairro = document.createAttribute("bairro-attr");
            bairro.value = acao.bairro;
            li.setAttributeNode(rua);
            li.setAttributeNode(numero);
            li.setAttributeNode(bairro);
            li.innerHTML = `
            <div class="acao">
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
        </div>
            `

            document.querySelector('#actions-list').appendChild(li);
            }

        getSelection() {
            return this.listFilesEl.querySelectorAll(".selected").length;
        }

        createListeners(){
            const actionsEls = document.querySelector('#actions-list').querySelectorAll(".acao");
            let selectionEvent = this.onselectionchange;
            for (let i = 0; i < actionsEls.length; i++) {
                actionsEls[i].addEventListener("click", function() {
                  actionsEls[i].classList.toggle("selected");
                  for(let j = 0;j < actionsEls.length; j++){
                      if(i!=j){
                          if(actionsEls[j].classList.contains('selected')){
                              actionsEls[j].classList.toggle("selected");
                          }
                      }
                  }

                  document.querySelector('#actions-list').dispatchEvent(selectionEvent);
                });
            }

            document.querySelector('#actions-list').addEventListener('selectionchange', e=>{
                
                    if(this.getSelection() > 0){
                        document.querySelector('#btn-edit').style.display = 'block';
                        document.querySelector('#btn-delete').style.display = 'block';
                        console.log('block');
                    } else {
                        document.querySelector('#btn-edit').style.display = 'none';
                        document.querySelector('#btn-delete').style.display = 'none';
                        console.log('none');
                    }
            })

            this.editAcao();
            this.removeAcao();
        }

        createAcao(){
            document.querySelector('#btn-create-acao').addEventListener('click', e=>{
                document.querySelector('.save-create').style.display = 'block';
                document.querySelector('.save-edit').style.display = 'none';

                document.querySelector('.title-acao').innerHTML = 'Criar nova ação'
                document.querySelector('#name-acao').value = '';
                document.querySelector('#descricao-acao').value = '';
                document.querySelector('#hora-acao').value = '';
                document.querySelector('#rua-acao').value = '';
                document.querySelector('#numero-acao').value = '';
                document.querySelector('#bairro-acao').value = '';
            })

            document.querySelector('.save-create').addEventListener('click', ()=>{
                this.verifyForm();
            })
        }

        verifyForm(){
            var forms = document.querySelectorAll('.needs-validation')
                Array.prototype.slice.call(forms)
                    .forEach((form) => {
                    form.addEventListener('submit', (event) => {
                        if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                        } else {
                            event.preventDefault();
                            this.uploadData();
                        }

                        form.classList.add('was-validated')
                    }, false)
                    })
        }

        uploadData(){
            const file = $('#acao-img').get(0).files[0];
            const metadata = {contentType: file.type};
            const task = firebase.storage().ref('Acoes/').child(document.querySelector('#name-acao').value).put(file, metadata);

            task.on(
                "state_changed",
                function progress(snapshot) {
                    $('#spinner-save-create').show();
                    $('#icon-save-create').hide();
                    $('.save-create p').html("Salvando");
                },
        
                function error() {
                    alert("Erro ao salvar ação");
                },
        
                function complete() {
                    $('#modal-open').modal('hide');
                }
                );

            task
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then((url) => {
                    console.log(url);
                    this.collectionRef.add({
                        "nome": document.querySelector('#name-acao').value,
                        "descricao": document.querySelector('#descricao-acao').value,
                        "hora": document.querySelector('#hora-acao').value,
                        "numero": document.querySelector('#numero-acao').value,
                        "rua": document.querySelector('#rua-acao').value,
                        "bairro": document.querySelector('#bairro-acao').value,
                        "path_img": url
                    })
                    .then((docRef) => {
                        this.getAcoes();
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
                })
                .catch(console.error);
        }

        editAcao() {
            document.querySelector('#btn-edit').addEventListener('click', e=>{
                document.querySelector('.save-create').style.display = 'none';
                document.querySelector('.save-edit').style.display = 'block';

                document.querySelector('.title-acao').innerHTML = 'Editar ação'
                let acao = document.querySelector('.selected');
                document.querySelector('#name-acao').value = acao.querySelector('.name').innerHTML;
                document.querySelector('#descricao-acao').value = acao.querySelector('.descricao').innerHTML;
                document.querySelector('#hora-acao').value = acao.querySelector('.hora').innerHTML;
                document.querySelector('#rua-acao').value = acao.parentElement.getAttribute('rua-attr');
                document.querySelector('#numero-acao').value = acao.parentElement.getAttribute('numero-attr');
                document.querySelector('#bairro-acao').value = acao.parentElement.getAttribute('bairro-attr');
            })

            document.querySelector('.save-edit').addEventListener('click', e=>{
                e.preventDefault();
                this.collectionRef.doc(document.querySelector('.selected').parentElement.id).update({
                    "nome": document.querySelector('#name-acao').value,
                    "descricao": document.querySelector('#descricao-acao').value,
                    "hora": document.querySelector('#hora-acao').value,
                    "numero": document.querySelector('#numero-acao').value,
                    "rua": document.querySelector('#rua-acao').value,
                    "bairro": document.querySelector('#bairro-acao').value
                }).then(()=>{
                    console.log("Ação atualizada!");
                    $('#modal-open').modal('hide');
                    this.getAcoes();
                })
            })
        }

        removeAcao(){
            document.querySelector('#yes').addEventListener('click', e=>{
                if(this.getSelection()>0){
                    this.collectionRef.doc(document.querySelector('.selected').parentElement.id).delete().then(() => {
                        this.getAcoes();
                        document.querySelector('#btn-edit').style.display = 'none';
                        document.querySelector('#btn-delete').style.display = 'none';
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                }
                
            })

        }

        getAcoes(){
            let query = this.collectionRef.get()
                .then(snapshot => {
                    document.querySelector('#actions-list').innerHTML = '';
                    let countActions = 0;
                    const numActions = snapshot.size;
                    snapshot.forEach(doc => {
                        doc.id, '=>', this.createAcoes(doc.data(), doc.id);
                        countActions ++;
                    });

                    if(countActions===numActions){this.createListeners();}
                })
                .catch(err => {
                    console.log('Error getting documents', err);
                });
        }
}

window.app = new AdminAcoesController()