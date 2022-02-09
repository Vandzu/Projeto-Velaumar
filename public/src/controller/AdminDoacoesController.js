class AdminDoacoesController{
    constructor(){
        const database = firebase.firestore();
        this.storage = firebase.storage();
        this.firestore = database;
        this.collectionRef = this.firestore.collection('Doacoes');
        this.listFilesEl = document.querySelector('#list-doacoes');
        this.onselectionchange = new Event("selectionchange");
        this.getDoacoes();
    }


    getDoacoes(){
        let countDoacoes = 0;
        this.collectionRef.get()
        .then(snapshot => {
            const sizeDoacoes = snapshot.size;
            document.querySelector('#list-doacoes').innerHTML = '';
            snapshot.forEach(doc => {
                countDoacoes++;
                doc.id, '=>', this.renderDoacoes(doc.data(), doc.id);
            });

            if(countDoacoes===sizeDoacoes){this.createListeners();}
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    }

    getSelection() {
        return this.listFilesEl.querySelectorAll(".selected").length;
    }

    createListeners(){
        const doacoesEls = document.querySelector('#list-doacoes').querySelectorAll(".doacao");
        let selectionEvent = this.onselectionchange;
        for (let i = 0; i < doacoesEls.length; i++) {
            doacoesEls[i].addEventListener("click", function() {
              doacoesEls[i].classList.toggle("selected");
              for(let j = 0;j < doacoesEls.length; j++){
                  if(i!=j){
                      if(doacoesEls[j].classList.contains('selected')){
                          doacoesEls[j].classList.toggle("selected");
                      }
                  }
              }

              document.querySelector('#list-doacoes').dispatchEvent(selectionEvent);
            });
        }

        document.querySelector('#list-doacoes').addEventListener('selectionchange', e=>{
            
                if(this.getSelection() > 0){
                    document.querySelector('#btn-edit').style.display = 'block';
                    document.querySelector('#btn-delete').style.display = 'block';
                } else {
                    document.querySelector('#btn-edit').style.display = 'none';
                    document.querySelector('#btn-delete').style.display = 'none';
                }
        })

        this.createDoacao();
        this.editDoacao();
        this.removeDoacao();
    }

    renderDoacoes(doacao, id) {
        let li = document.createElement('li');
        li.className = "col-3 doacao text-center";
        li.id = id;
        li.innerHTML = `
        <div class="lin">
        <b class="name">${doacao.nome}</b>
        </div>
        <div class="lin">
            <label class="descricao">${doacao.descricao}</label>
        </div>
        <div class="lin">
            <div class="img-doacao" style="background-image: url('${doacao.path_img}')">
            </div>
        </div>
        `
        document.querySelector('#list-doacoes').appendChild(li);
        }

        editDoacao() {
            document.querySelector('#btn-edit').addEventListener('click', e=>{
                document.querySelector('.save-create').style.display = 'none';
                document.querySelector('.save-edit').style.display = 'block';

                this.collectionRef.doc(document.querySelector('.selected').id).get().then((doc)=>{
                    if(doc.exists){
                        document.querySelector('.title-doacao').innerHTML = 'Editar ação'
                        let doacao = document.querySelector('.selected');
                        document.querySelector('#name-doacao').value = doacao.querySelector('li .name').innerHTML;
                        document.querySelector('#descricao-doacao').value = doacao.querySelector('li .descricao').innerHTML;
                        document.querySelector('#rua-doacao').value = doc.data().rua;
                        document.querySelector('#numero-doacao').value = doc.data().numero;
                        document.querySelector('#bairro-doacao').value = doc.data().bairro;
                        document.querySelector('#proposito-doacao').value = doc.data().proposito;
                        document.querySelector('#entrega-doacao').value = doc.data().entrega;
                    }}).catch((error)=>{
                        console.log(error);
                    })

            })

            document.querySelector('.save-edit').addEventListener('click', e=>{
                e.preventDefault();
                const file = $('#doacao-img').get(0).files[0];

                if(file){
                    const metadata = {contentType: file.type};
                    const task = firebase.storage().ref('Doacoes/').child(document.querySelector('#name-doacao').value).put(file, metadata);

                    task.on(
                        "state_changed",
                        function progress(snapshot) {
                            $('#spinner-save-create').show();
                            $('#icon-save-create').hide();
                            $('.save-create p').html("Salvando");
                        },
                
                        function error() {
                            alert("Erro ao salvar ação");
                        });

                    task
                        .then(snapshot => snapshot.ref.getDownloadURL())
                        .then((url) => {
                            console.log(url);
                            this.collectionRef.doc(document.querySelector('.selected').id).update({
                                "nome": document.querySelector('#name-doacao').value,
                                "descricao": document.querySelector('#descricao-doacao').value,
                                "proposito": document.querySelector('#proposito-doacao').value,
                                "entrega": document.querySelector('#entrega-doacao').value,
                                "numero": document.querySelector('#numero-doacao').value,
                                "rua": document.querySelector('#rua-doacao').value,
                                "bairro": document.querySelector('#bairro-doacao').value,
                                "path_img": url
                            })
                            .then(() => {
                                $('#modal-open').modal('hide');
                                $('#spinner-save-create').hide();
                                $('#icon-save-create').show();
                                $('.save-create p').html("Salvar");
                                this.getDoacoes();
                            })
                            .catch((error) => {
                                console.error("Error adding document: ", error);
                            });
                        })
                        .catch(console.error);
                } else {
                    this.collectionRef.doc(document.querySelector('.selected').id).update({
                        "nome": document.querySelector('#name-doacao').value,
                        "descricao": document.querySelector('#descricao-doacao').value,
                        "proposito": document.querySelector('#proposito-doacao').value,
                        "entrega": document.querySelector('#entrega-doacao').value,
                        "numero": document.querySelector('#numero-doacao').value,
                        "rua": document.querySelector('#rua-doacao').value,
                        "bairro": document.querySelector('#bairro-doacao').value,
                        
                    }).then(()=>{
                        $('#modal-open').modal('hide');
                        $('#spinner-save-create').hide();
                        $('#icon-save-create').show();
                        $('.save-create p').html("Salvar");
                        this.getDoacoes();
                    })
                }
                
            })
        }

        removeDoacao(){
            document.querySelector('#yes').addEventListener('click', e=>{
                let doacao = document.querySelector('.selected');
                firebase.storage().ref('Doacoes/').child(doacao.querySelector('li .name').innerHTML).delete().then(()=>{
                    if(this.getSelection()>0){
                        this.collectionRef.doc(document.querySelector('.selected').id).delete().then(() => {
                            this.getDoacoes();
                            document.querySelector('#btn-edit').style.display = 'none';
                            document.querySelector('#btn-delete').style.display = 'none';
                        }).catch((error) => {
                            console.error("Error removing document: ", error);
                        });
                    }
                }).catch((error)=>{
                    console.log(error);
                });

                
                
            })

        }

    createDoacao(){
        document.querySelector('#btn-create-doacao').addEventListener('click', e=>{
            document.querySelector('.save-edit').style.display = 'none';
            document.querySelector('.save-create').style.display = 'block';
        })

        document.querySelector('.save-create').addEventListener('click', e=>{
            e.preventDefault();
            const file = $('#doacao-img').get(0).files[0];
            const metadata = {contentType: file.type};
            const task = firebase.storage().ref('Doacoes/').child(document.querySelector('#name-doacao').value).put(file, metadata);

            task.on(
                "state_changed",
                function progress(snapshot) {
                    $('#spinner-save-create').show();
                    $('#icon-save-create').hide();
                    $('.save-create p').html("Salvando");
                },
        
                function error() {
                    alert("Erro ao salvar doação");
                });

            task
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then((url) => {
                    console.log(url);
                    this.collectionRef.add({
                        "nome": document.querySelector('#name-doacao').value,
                        "descricao": document.querySelector('#descricao-doacao').value,
                        "proposito": document.querySelector('#proposito-doacao').value,
                        "entrega": document.querySelector('#entrega-doacao').value,
                        "numero": document.querySelector('#numero-doacao').value,
                        "rua": document.querySelector('#rua-doacao').value,
                        "bairro": document.querySelector('#bairro-doacao').value,
                        "path_img": url
                    })
                    .then(() => {
                        $('#modal-open').modal('hide');
                        $('#spinner-save-create').hide();
                        $('#icon-save-create').show();
                        $('.save-create p').html("Salvar");
                        this.getDoacoes();
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
                })
                .catch(console.error);
        })
    }

}

window.app = new AdminDoacoesController()