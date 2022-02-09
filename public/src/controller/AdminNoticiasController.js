class AdminNoticiasController {
    constructor(){
        const database = firebase.firestore();
        this.firestore = database;
        this.collectionRef = this.firestore.collection('Noticias');
        this.onselectionchange = new Event("selectionchange");
        this.listFilesEl = document.querySelector('#list-noticias');
        this.initEditor();
        this.getNoticias();
        this.visualizarNoticia();
        this.deleteNoticia();
    }

    initEditor(){
      let quill_create = new Quill('#editor-container', {
        theme: 'snow',
         modules: {
           toolbar: [
             [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
             ['bold', 'italic', 'underline', 'strike', 'blockquote'],
             [{ 'color': [] }, { 'background': [] }], 
             [{ 'align': [] }, { list: 'ordered' }, { list: 'bullet' }],
             ['link', 'image', 'video']
           ]
        }
      });    

      $('.salvar').click(()=>{
        let delta_create = quill_create.getContents();  
        this.saveNoticia(delta_create, quill_create);      
      })
    }

    eraseFields(quill){
      document.getElementById('titulo-create').value = '';
      document.getElementById('subtitulo-create').value = '';
      document.getElementById('noticia-img').value = '';
      quill.root.innerHTML = '';
    }

    saveNoticia(delta, quill){
      let idimg = 0;
      let countImgs = 0;
      let countImgs2 = 0;
      let imgRef = document.querySelector('#titulo-create').value;

      $('#spinner-save-create').show();
      $('.salvar p').html("Postando");
      $('.salvar').prop("disabled", true);

      for (let j = 0; j < delta.ops.length; j++) {
        if(delta.ops[j].insert.image){
          countImgs++;
        }

        if(j+1===delta.ops.length){
          const file = $('#noticia-img').get(0).files[0];
          const metadata = {contentType: file.type};
          const task = firebase.storage().ref('Noticias/'+imgRef).child(imgRef+'thumb').put(file, metadata);

          if(countImgs>0){

            task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
              for (let i = 0; i < delta.ops.length; i++) {
                if(delta.ops[i].insert.image){
                  idimg++;
                  
                  let imgbase64 = delta.ops[i].insert.image;
                  let verifyformat = imgbase64.substring(0, 23);
        
                  if(verifyformat.includes("jpeg")){
                    var img = imgbase64.slice(23);
                    console.log('its jpeg');
                    var typeimg = {contentType:'image/jpg'}
                  } else if(verifyformat.includes("png")){
                    var img = imgbase64.slice(22);
                    console.log('its png');
                    var typeimg = {contentType:'image/png'}
                  }
        
                  let uploadTask = firebase.storage().ref('Noticias/'+imgRef).child(imgRef+idimg).putString(img, 'base64', typeimg);
                  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    (snapshot) => {

                    }, (error)=>{
                      console.log(error);
                  }, () => {
        
                    let ref = firebase.storage().ref('Noticias/'+imgRef).child(imgRef+idimg);
                    ref.getDownloadURL()
                    .then((url) => {
                      const xhr = new XMLHttpRequest();
                      xhr.responseType = 'blob';
                      xhr.onload = (event) => {
                        const blob = xhr.response;
                      };
                      xhr.open('GET', url);
                      xhr.send();
        
                      delta.ops[i].insert.image = url;
                      countImgs2++;
        
                      if(countImgs2===countImgs){                
                        quill.setContents(delta);
                        let content = quill.root.innerHTML;

                        this.collectionRef.add({
                          "titulo": document.querySelector('#titulo-create').value,
                          "subtitulo": document.querySelector('#subtitulo-create').value,
                          "conteudo": content,
                          "hora": this.getDateAndHour(),
                          "thumb": url
                          })
                          .then(() => {
                              $('#modal-noticia').modal('hide');
                              $('.salvar').prop("disabled", false);
                              $('#spinner-save-create').hide();
                              $('.salvar p').html("Postar notícia");  
                              this.getNoticias();
                              this.eraseFields();
                          })
                          .catch((error) => {
                              console.error("Error adding document: ", error);
                          });
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                  });
                }
              }
            }).catch((error)=>{
              console.error(error);
            });

          } else {
      
            task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
                quill.setContents(delta);
                let content = quill.root.innerHTML;

                this.collectionRef.add({
                  "titulo": document.querySelector('#titulo-create').value,
                  "subtitulo": document.querySelector('#subtitulo-create').value,
                  "conteudo": content,
                  "hora": this.getDateAndHour(),
                  "thumb": url
                  })
                  .then(() => {
                      $('#modal-noticia').modal('hide');
                      $('.salvar').prop("disabled", false);
                      $('#spinner-save-create').hide();
                      $('.salvar p').html("Postar notícia");  
                      this.getNoticias();
                      this.eraseFields();
                  })
                  .catch((error) => {
                      console.error("Error adding document: ", error);
                  });
            }).catch((error)=>{
              console.error(error);
            });
          }
        }
      }
    }

    visualizarNoticia(){
      document.querySelector('#btn-edit').addEventListener('click', e=>{
        let id = document.querySelector('.selected').id;
        let docRef = this.collectionRef.doc(id);
        docRef.get().then((doc)=>{
          if (doc.exists) {
            document.querySelector('#modal-body-visualizar').innerHTML = `
                          <div class="texts text-center mb-3 col-12">
            <h3>${doc.data().titulo}</h3>
            <p class="descricao">
                ${doc.data().subtitulo}
            </p>
            <i class="hora-post">
                Postado em ${doc.data().hora}
            </i>
            </div>
            ${doc.data().conteudo}
            `;

            $('#modal-visualizar').modal('show');
          }
        })

      })
    }

    deleteNoticia(){
      $('#yes').click(()=>{
        let id = $('.selected').attr('id');
        let docRef = this.collectionRef.doc(id);
        console.log('excluir', id);

        docRef.get().then((doc)=>{
          if (doc.exists) {
            const ref = firebase.storage().ref('Noticias/').child(doc.data().titulo);
            ref.listAll().then((listResults) => {
              const promises = listResults.items.map((item) => {
                item.delete();
              });
              Promise.all(promises);
            });

              this.collectionRef.doc(id).delete().then(() => {
                $('#modal-delete').modal('hide');
                this.getNoticias();
                document.querySelector('#btn-edit').style.display = 'none';
                document.querySelector('#btn-delete').style.display = 'none';
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });

          }
        })

      })
    }

    getDateAndHour(){
      let currentdate = new Date(); 

      let datetime =  ((currentdate.getDate() < 10)?"0":"") + currentdate.getDate() + "/"
                      + (((currentdate.getMonth()+1)<10)?"0":"")  + (currentdate.getMonth()+1) + "/" 
                      + currentdate.getFullYear() + " às "  
                      + ((currentdate.getHours() < 10)?"0":"") + currentdate.getHours() + ":"  
                      + ((currentdate.getMinutes() < 10)?"0":"") + currentdate.getMinutes() + ":" 
                      + ((currentdate.getSeconds() < 10)?"0":"") + currentdate.getSeconds();
      return datetime;
    }

    initListeners(){
      const noticiasEl = document.querySelector('#list-noticias').querySelectorAll(".noticia");
      let selectionEvent = this.onselectionchange;
      for (let i = 0; i < noticiasEl.length; i++) {
          noticiasEl[i].addEventListener("click", function() {
            noticiasEl[i].classList.toggle("selected");
            for(let j = 0;j < noticiasEl.length; j++){
                if(i!=j){
                    if(noticiasEl[j].classList.contains('selected')){
                        noticiasEl[j].classList.toggle("selected");
                    }
                }
            }

            document.querySelector('#list-noticias').dispatchEvent(selectionEvent);
          });
      }

      document.querySelector('#list-noticias').addEventListener('selectionchange', e=>{
          
              if(this.getSelection() > 0){
                  document.querySelector('#btn-edit').style.display = 'block';
                  document.querySelector('#btn-delete').style.display = 'block';
              } else {
                  document.querySelector('#btn-edit').style.display = 'none';
                  document.querySelector('#btn-delete').style.display = 'none';
              }
      })

    }

    getSelection() {
      return this.listFilesEl.querySelectorAll(".selected").length;
    }

    createNoticias(data, id){
      let noticiaEl = document.createElement('li');
      noticiaEl.className = "col-5 noticia";
      noticiaEl.id = id;
      noticiaEl.innerHTML = `
      <div class="row">
          <div class="thumb col-3" style="background-image: url(${data.thumb})">
          
          </div>

          <div class="texts col-6">
              <h4 class="titulo">${data.titulo}</h4>
              <p class="descricao">
                  ${data.subtitulo}
              </p>
              <i class="hora-post">
                  Postado em ${data.hora}
              </i>
          </div>
      </div>
      `

      document.querySelector('#list-noticias').appendChild(noticiaEl);
  }

    getNoticias(){
      let query = this.collectionRef.get()
              .then(snapshot => {
                  document.querySelector('#list-noticias').innerHTML = '';
                  let countActions = 0;
                  const numActions = snapshot.size;
                  snapshot.forEach(doc => {
                      doc.id, '=>', this.createNoticias(doc.data(), doc.id);
                      countActions ++;
                  });

                  if(countActions===numActions){this.initListeners();}
              })
              .catch(err => {
                  console.log('Error getting documents', err);
              });
          }
}

window.app = new AdminNoticiasController