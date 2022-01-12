class DocsUserController {
constructor(){
this.currentFolder = ['Velaumar'];
this.listFilesEl = document.querySelector(".archives");
this.connectFirebase();
this.readFiles();
this.storage = firebase.storage();
this.storageRef = this.storage.ref();
this.filters();
}

connectFirebase() {
const firebaseConfig = {
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
}

getFirebaseRef(path) {

if (!path) path = this.currentFolder.join('/')

return firebase.database().ref(path);
}

getFileIconView(file, key) {
switch (file.type) {
    case "folder":
    return `
    <svg width="160" height="160" viewBox="0 0 160 160" class="mc-icon-template-content tile__preview tile__preview--icon">
        <title>content-folder-large</title>
        <g fill="none" fill-rule="evenodd">
            <path d="M77.955 53h50.04A3.002 3.002 0 0 1 131 56.007v58.988a4.008 4.008 0 0 1-4.003 4.005H39.003A4.002 4.002 0 0 1 35 114.995V45.99c0-2.206 1.79-3.99 3.997-3.99h26.002c1.666 0 3.667 1.166 4.49 2.605l3.341 5.848s1.281 2.544 5.12 2.544l.005.003z" fill="#71B9F4"></path>
            <path d="M77.955 52h50.04A3.002 3.002 0 0 1 131 55.007v58.988a4.008 4.008 0 0 1-4.003 4.005H39.003A4.002 4.002 0 0 1 35 113.995V44.99c0-2.206 1.79-3.99 3.997-3.99h26.002c1.666 0 3.667 1.166 4.49 2.605l3.341 5.848s1.281 2.544 5.12 2.544l.005.003z" fill="#92CEFF"></path>
        </g>
    </svg>`;
    break;

    case "application/pdf":
    return `
            <div class="arch">
            <svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="160px" height="160px" viewBox="0 0 160 160" enable-background="new 0 0 160 160" xml:space="preserve">
            <filter height="102%" width="101.4%" id="mc-content-unknown-large-a" filterUnits="objectBoundingBox" y="-.5%" x="-.7%">
                <feOffset result="shadowOffsetOuter1" in="SourceAlpha" dy="1"></feOffset>
                <feColorMatrix values="0 0 0 0 0.858823529 0 0 0 0 0.870588235 0 0 0 0 0.88627451 0 0 0 1 0" in="shadowOffsetOuter1">
                </feColorMatrix>
            </filter>
            <title>PDF</title>
            <g>
                <g>
                <g filter="url(#mc-content-unknown-large-a)">
                    <path id="mc-content-unknown-large-b_2_" d="M47,30h66c2.209,0,4,1.791,4,4v92c0,2.209-1.791,4-4,4H47c-2.209,0-4-1.791-4-4V34
                    C43,31.791,44.791,30,47,30z"></path>
                </g>
                <g>
                    <path id="mc-content-unknown-large-b_1_" fill="#F7F9FA" d="M47,30h66c2.209,0,4,1.791,4,4v92c0,2.209-1.791,4-4,4H47
                    c-2.209,0-4-1.791-4-4V34C43,31.791,44.791,30,47,30z"></path>
                </g>
                </g>
            </g>
            <path fill-rule="evenodd" clip-rule="evenodd" fill="#F15124" d="M102.482,91.479c-0.733-3.055-3.12-4.025-5.954-4.437
                c-2.08-0.302-4.735,1.019-6.154-0.883c-2.167-2.905-4.015-6.144-5.428-9.482c-1.017-2.402,1.516-4.188,2.394-6.263
                c1.943-4.595,0.738-7.984-3.519-9.021c-2.597-0.632-5.045-0.13-6.849,1.918c-2.266,2.574-1.215,5.258,0.095,7.878
                c3.563,7.127-1.046,15.324-8.885,15.826c-3.794,0.243-6.93,1.297-7.183,5.84c0.494,3.255,1.988,5.797,5.14,6.825
                c3.062,1,4.941-0.976,6.664-3.186c1.391-1.782,1.572-4.905,4.104-5.291c3.25-0.497,6.677-0.464,9.942-0.025
                c2.361,0.318,2.556,3.209,3.774,4.9c2.97,4.122,6.014,5.029,9.126,2.415C101.895,96.694,103.179,94.38,102.482,91.479z
                M67.667,94.885c-1.16-0.312-1.621-0.97-1.607-1.861c0.018-1.199,1.032-1.121,1.805-1.132c0.557-0.008,1.486-0.198,1.4,0.827
                C69.173,93.804,68.363,94.401,67.667,94.885z M82.146,65.949c1.331,0.02,1.774,0.715,1.234,1.944
                c-0.319,0.725-0.457,1.663-1.577,1.651c-1.03-0.498-1.314-1.528-1.409-2.456C80.276,65.923,81.341,65.938,82.146,65.949z
                M81.955,86.183c-0.912,0.01-2.209,0.098-1.733-1.421c0.264-0.841,0.955-2.04,1.622-2.162c1.411-0.259,1.409,1.421,2.049,2.186
                C84.057,86.456,82.837,86.174,81.955,86.183z M96.229,94.8c-1.14-0.082-1.692-1.111-1.785-2.033
                c-0.131-1.296,1.072-0.867,1.753-0.876c0.796-0.011,1.668,0.118,1.588,1.293C97.394,93.857,97.226,94.871,96.229,94.8z"></path>
        </svg>
            </div>
            <div class="botao4" id="abrir${key}" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Abrir
            </div>

            <button type="button" class="icon" id="${key}">
                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7033 14.3901L15.9813 10.112M11.7033 14.3901V1.55603V14.3901ZM11.7033 14.3901L7.42529 10.112L11.7033 14.3901Z" stroke="#494949" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.0083 16.5291L1.67246 19.1868C1.78813 19.6495 2.05515 20.0603 2.43109 20.3539C2.80703 20.6475 3.27031 20.807 3.7473 20.8071H19.6593C20.1363 20.807 20.5996 20.6475 20.9756 20.3539C21.3515 20.0603 21.6185 19.6495 21.7342 19.1868L22.3983 16.5291" stroke="#494949" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>                                                    
            </button>
            <button type="button" class="icon" id="share${key}">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.9245 3.92667C15.9244 3.10332 16.2138 2.30614 16.7421 1.67462C17.2704 1.04309 18.0039 0.617437 18.8144 0.472119C19.6248 0.326801 20.4605 0.471075 21.1753 0.8797C21.8901 1.28832 22.4385 1.93528 22.7245 2.70737C23.0104 3.47947 23.0158 4.32753 22.7397 5.1032C22.4635 5.87886 21.9234 6.53273 21.2139 6.9504C20.5043 7.36808 19.6705 7.52296 18.8583 7.38794C18.0461 7.25293 17.3072 6.83663 16.7709 6.21187L7.34101 10.5914C7.55779 11.2784 7.55779 12.0155 7.34101 12.7025L16.7709 17.082C17.3378 16.4227 18.1292 15.9974 18.9918 15.8884C19.8545 15.7794 20.7268 15.9945 21.4399 16.492C22.1529 16.9895 22.6558 17.7341 22.8512 18.5813C23.0466 19.4285 22.9205 20.3181 22.4974 21.0777C22.0743 21.8372 21.3842 22.4127 20.561 22.6924C19.7378 22.9722 18.84 22.9364 18.0417 22.592C17.2433 22.2476 16.6013 21.6191 16.24 20.8282C15.8786 20.0374 15.8237 19.1406 16.0859 18.3116L6.65601 13.9321C6.18919 14.4761 5.56696 14.8642 4.87302 15.044C4.17908 15.2238 3.44672 15.1867 2.77446 14.9378C2.1022 14.6889 1.52229 14.2401 1.11273 13.6518C0.703184 13.0634 0.483643 12.3638 0.483643 11.6469C0.483643 10.9301 0.703184 10.2304 1.11273 9.64206C1.52229 9.05372 2.1022 8.60491 2.77446 8.35602C3.44672 8.10713 4.17908 8.07009 4.87302 8.24989C5.56696 8.42969 6.18919 8.81771 6.65601 9.36173L16.0859 4.98224C15.9786 4.64068 15.9242 4.2847 15.9245 3.92667Z" fill="#494949"/>
                </svg>                            
            </button>


    `;
    break;

    case "audio/mp3":
    case "audio/ogg":
    return `
            <div class="arch">
                    <svg width="160" height="160" viewBox="0 0 160 160" class="mc-icon-template-content tile__preview tile__preview--icon">
                    <title>content-audio-large</title>
                    <defs>
                    <rect id="mc-content-audio-large-b" x="30" y="43" width="100" height="74" rx="4"></rect>
                    <filter x="-.5%" y="-.7%" width="101%" height="102.7%" filterUnits="objectBoundingBox" id="mc-content-audio-large-a">
                        <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                        <feColorMatrix values="0 0 0 0 0.858823529 0 0 0 0 0.870588235 0 0 0 0 0.88627451 0 0 0 1 0" in="shadowOffsetOuter1"></feColorMatrix>
                    </filter>
                    </defs>
                    <g fill="none" fill-rule="evenodd">
                    <g>
                        <use fill="#000" filter="url(#mc-content-audio-large-a)" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mc-content-audio-large-b"></use>
                        <use fill="#F7F9FA" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mc-content-audio-large-b"></use>
                    </g>
                    <path d="M67 60c0-1.657 1.347-3 3-3 1.657 0 3 1.352 3 3v40c0 1.657-1.347 3-3 3-1.657 0-3-1.352-3-3V60zM57 78c0-1.657 1.347-3 3-3 1.657 0 3 1.349 3 3v4c0 1.657-1.347 3-3 3-1.657 0-3-1.349-3-3v-4zm40 0c0-1.657 1.347-3 3-3 1.657 0 3 1.349 3 3v4c0 1.657-1.347 3-3 3-1.657 0-3-1.349-3-3v-4zm-20-5.006A3 3 0 0 1 80 70c1.657 0 3 1.343 3 2.994v14.012A3 3 0 0 1 80 90c-1.657 0-3-1.343-3-2.994V72.994zM87 68c0-1.657 1.347-3 3-3 1.657 0 3 1.347 3 3v24c0 1.657-1.347 3-3 3-1.657 0-3-1.347-3-3V68z" fill="#637282"></path>
                    </g>
                    </svg>
            </div>
            <div class="botao4" id="abrir${key}" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Abrir
            </div>

            <button type="button" class="icon" id="${key}">
                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7033 14.3901L15.9813 10.112M11.7033 14.3901V1.55603V14.3901ZM11.7033 14.3901L7.42529 10.112L11.7033 14.3901Z" stroke="#494949" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.0083 16.5291L1.67246 19.1868C1.78813 19.6495 2.05515 20.0603 2.43109 20.3539C2.80703 20.6475 3.27031 20.807 3.7473 20.8071H19.6593C20.1363 20.807 20.5996 20.6475 20.9756 20.3539C21.3515 20.0603 21.6185 19.6495 21.7342 19.1868L22.3983 16.5291" stroke="#494949" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>                                                    
            </button>
            <button type="button" class="icon" id="share${key}">
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.9245 3.92667C15.9244 3.10332 16.2138 2.30614 16.7421 1.67462C17.2704 1.04309 18.0039 0.617437 18.8144 0.472119C19.6248 0.326801 20.4605 0.471075 21.1753 0.8797C21.8901 1.28832 22.4385 1.93528 22.7245 2.70737C23.0104 3.47947 23.0158 4.32753 22.7397 5.1032C22.4635 5.87886 21.9234 6.53273 21.2139 6.9504C20.5043 7.36808 19.6705 7.52296 18.8583 7.38794C18.0461 7.25293 17.3072 6.83663 16.7709 6.21187L7.34101 10.5914C7.55779 11.2784 7.55779 12.0155 7.34101 12.7025L16.7709 17.082C17.3378 16.4227 18.1292 15.9974 18.9918 15.8884C19.8545 15.7794 20.7268 15.9945 21.4399 16.492C22.1529 16.9895 22.6558 17.7341 22.8512 18.5813C23.0466 19.4285 22.9205 20.3181 22.4974 21.0777C22.0743 21.8372 21.3842 22.4127 20.561 22.6924C19.7378 22.9722 18.84 22.9364 18.0417 22.592C17.2433 22.2476 16.6013 21.6191 16.24 20.8282C15.8786 20.0374 15.8237 19.1406 16.0859 18.3116L6.65601 13.9321C6.18919 14.4761 5.56696 14.8642 4.87302 15.044C4.17908 15.2238 3.44672 15.1867 2.77446 14.9378C2.1022 14.6889 1.52229 14.2401 1.11273 13.6518C0.703184 13.0634 0.483643 12.3638 0.483643 11.6469C0.483643 10.9301 0.703184 10.2304 1.11273 9.64206C1.52229 9.05372 2.1022 8.60491 2.77446 8.35602C3.44672 8.10713 4.17908 8.07009 4.87302 8.24989C5.56696 8.42969 6.18919 8.81771 6.65601 9.36173L16.0859 4.98224C15.9786 4.64068 15.9242 4.2847 15.9245 3.92667Z" fill="#494949"/>
            </svg>                            
            </button>

    
    `;
    break;

    case "video/mp4":
    case "video/quicktime":
    return `
            <div class="arch">
                    <svg width="160" height="160" viewBox="0 0 160 160" class="mc-icon-template-content tile__preview tile__preview--icon">
                    <title>content-video-large</title>
                    <defs>
                    <rect id="mc-content-video-large-b" x="30" y="43" width="100" height="74" rx="4"></rect>
                    <filter x="-.5%" y="-.7%" width="101%" height="102.7%" filterUnits="objectBoundingBox" id="mc-content-video-large-a">
                        <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                        <feColorMatrix values="0 0 0 0 0.858823529 0 0 0 0 0.870588235 0 0 0 0 0.88627451 0 0 0 1 0" in="shadowOffsetOuter1"></feColorMatrix>
                    </filter>
                    </defs>
                    <g fill="none" fill-rule="evenodd">
                    <g>
                        <use fill="#000" filter="url(#mc-content-video-large-a)" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mc-content-video-large-b"></use>
                        <use fill="#F7F9FA" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mc-content-video-large-b"></use>
                    </g>
                    <path d="M69 67.991c0-1.1.808-1.587 1.794-1.094l24.412 12.206c.99.495.986 1.3 0 1.794L70.794 93.103c-.99.495-1.794-.003-1.794-1.094V67.99z" fill="#637282"></path>
                    </g>
                    </svg>
            </div>
            <div class="botao4" id="abrir${key}" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Abrir
            </div>

            <button type="button" class="icon" id="${key}"> 
                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7033 14.3901L15.9813 10.112M11.7033 14.3901V1.55603V14.3901ZM11.7033 14.3901L7.42529 10.112L11.7033 14.3901Z" stroke="#494949" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.0083 16.5291L1.67246 19.1868C1.78813 19.6495 2.05515 20.0603 2.43109 20.3539C2.80703 20.6475 3.27031 20.807 3.7473 20.8071H19.6593C20.1363 20.807 20.5996 20.6475 20.9756 20.3539C21.3515 20.0603 21.6185 19.6495 21.7342 19.1868L22.3983 16.5291" stroke="#494949" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>                                                    
            </button>
            <button type="button" class="icon" id="share${key}">
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.9245 3.92667C15.9244 3.10332 16.2138 2.30614 16.7421 1.67462C17.2704 1.04309 18.0039 0.617437 18.8144 0.472119C19.6248 0.326801 20.4605 0.471075 21.1753 0.8797C21.8901 1.28832 22.4385 1.93528 22.7245 2.70737C23.0104 3.47947 23.0158 4.32753 22.7397 5.1032C22.4635 5.87886 21.9234 6.53273 21.2139 6.9504C20.5043 7.36808 19.6705 7.52296 18.8583 7.38794C18.0461 7.25293 17.3072 6.83663 16.7709 6.21187L7.34101 10.5914C7.55779 11.2784 7.55779 12.0155 7.34101 12.7025L16.7709 17.082C17.3378 16.4227 18.1292 15.9974 18.9918 15.8884C19.8545 15.7794 20.7268 15.9945 21.4399 16.492C22.1529 16.9895 22.6558 17.7341 22.8512 18.5813C23.0466 19.4285 22.9205 20.3181 22.4974 21.0777C22.0743 21.8372 21.3842 22.4127 20.561 22.6924C19.7378 22.9722 18.84 22.9364 18.0417 22.592C17.2433 22.2476 16.6013 21.6191 16.24 20.8282C15.8786 20.0374 15.8237 19.1406 16.0859 18.3116L6.65601 13.9321C6.18919 14.4761 5.56696 14.8642 4.87302 15.044C4.17908 15.2238 3.44672 15.1867 2.77446 14.9378C2.1022 14.6889 1.52229 14.2401 1.11273 13.6518C0.703184 13.0634 0.483643 12.3638 0.483643 11.6469C0.483643 10.9301 0.703184 10.2304 1.11273 9.64206C1.52229 9.05372 2.1022 8.60491 2.77446 8.35602C3.44672 8.10713 4.17908 8.07009 4.87302 8.24989C5.56696 8.42969 6.18919 8.81771 6.65601 9.36173L16.0859 4.98224C15.9786 4.64068 15.9242 4.2847 15.9245 3.92667Z" fill="#494949"/>
            </svg>                            
            </button>
    `;
    break;

    case "image/jpeg":
    case "image/jpg":
    case "image/png":
    case "image/gif":
    return `
    <div class="arch">
                <svg class="justify-content-center" version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="160px" height="160px" viewBox="0 0 160 160" enable-background="new 0 0 160 160" xml:space="preserve">
                <filter height="102%" width="101.4%" id="mc-content-unknown-large-a" filterUnits="objectBoundingBox" y="-.5%" x="-.7%">
                <feOffset result="shadowOffsetOuter1" in="SourceAlpha" dy="1"></feOffset>
                <feColorMatrix values="0 0 0 0 0.858823529 0 0 0 0 0.870588235 0 0 0 0 0.88627451 0 0 0 1 0" in="shadowOffsetOuter1">
                </feColorMatrix>
                </filter>
                <title>Imagem</title>
                <g>
                <g>
                    <g filter="url(#mc-content-unknown-large-a)">
                        <path id="mc-content-unknown-large-b_2_" d="M47,30h66c2.209,0,4,1.791,4,4v92c0,2.209-1.791,4-4,4H47c-2.209,0-4-1.791-4-4V34
                        C43,31.791,44.791,30,47,30z"></path>
                    </g>
                    <g>
                        <path id="mc-content-unknown-large-b_1_" fill="#F7F9FA" d="M47,30h66c2.209,0,4,1.791,4,4v92c0,2.209-1.791,4-4,4H47
                        c-2.209,0-4-1.791-4-4V34C43,31.791,44.791,30,47,30z"></path>
                    </g>
                </g>
                </g>
                <g>
                <path fill-rule="evenodd" clip-rule="evenodd" fill="#848484" d="M81.148,62.638c8.086,0,16.173-0.001,24.259,0.001
                    c1.792,0,2.3,0.503,2.301,2.28c0.001,11.414,0.001,22.829,0,34.243c0,1.775-0.53,2.32-2.289,2.32
                    c-16.209,0.003-32.417,0.003-48.626,0c-1.775,0-2.317-0.542-2.318-2.306c-0.002-11.414-0.003-22.829,0-34.243
                    c0-1.769,0.532-2.294,2.306-2.294C64.903,62.637,73.026,62.638,81.148,62.638z M81.115,97.911c7.337,0,14.673-0.016,22.009,0.021
                    c0.856,0.005,1.045-0.238,1.042-1.062c-0.028-9.877-0.03-19.754,0.002-29.63c0.003-0.9-0.257-1.114-1.134-1.112
                    c-14.637,0.027-29.273,0.025-43.91,0.003c-0.801-0.001-1.09,0.141-1.086,1.033c0.036,9.913,0.036,19.826,0,29.738
                    c-0.003,0.878,0.268,1.03,1.069,1.027C66.443,97.898,73.779,97.911,81.115,97.911z"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" fill="#848484" d="M77.737,85.036c3.505-2.455,7.213-4.083,11.161-5.165
                    c4.144-1.135,8.364-1.504,12.651-1.116c0.64,0.058,0.835,0.257,0.831,0.902c-0.024,5.191-0.024,10.381,0.001,15.572
                    c0.003,0.631-0.206,0.76-0.789,0.756c-3.688-0.024-7.375-0.009-11.062-0.018c-0.33-0.001-0.67,0.106-0.918-0.33
                    c-2.487-4.379-6.362-7.275-10.562-9.819C78.656,85.579,78.257,85.345,77.737,85.036z"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" fill="#848484" d="M87.313,95.973c-0.538,0-0.815,0-1.094,0
                    c-8.477,0-16.953-0.012-25.43,0.021c-0.794,0.003-1.01-0.176-0.998-0.988c0.051-3.396,0.026-6.795,0.017-10.193
                    c-0.001-0.497-0.042-0.847,0.693-0.839c6.389,0.065,12.483,1.296,18.093,4.476C81.915,90.33,84.829,92.695,87.313,95.973z"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" fill="#848484" d="M74.188,76.557c0.01,2.266-1.932,4.223-4.221,4.255
                    c-2.309,0.033-4.344-1.984-4.313-4.276c0.03-2.263,2.016-4.213,4.281-4.206C72.207,72.338,74.179,74.298,74.188,76.557z"></path>
                </g>
            </svg>
            </div>
            <div class="botao4" id="abrir${key}" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Abrir
            </div>

            <button type="button" class="icon" id="${key}">
                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7033 14.3901L15.9813 10.112M11.7033 14.3901V1.55603V14.3901ZM11.7033 14.3901L7.42529 10.112L11.7033 14.3901Z" stroke="#494949" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.0083 16.5291L1.67246 19.1868C1.78813 19.6495 2.05515 20.0603 2.43109 20.3539C2.80703 20.6475 3.27031 20.807 3.7473 20.8071H19.6593C20.1363 20.807 20.5996 20.6475 20.9756 20.3539C21.3515 20.0603 21.6185 19.6495 21.7342 19.1868L22.3983 16.5291" stroke="#494949" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>                                                    
            </button>
            <button type="button" class="icon" id="share${key}">
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.9245 3.92667C15.9244 3.10332 16.2138 2.30614 16.7421 1.67462C17.2704 1.04309 18.0039 0.617437 18.8144 0.472119C19.6248 0.326801 20.4605 0.471075 21.1753 0.8797C21.8901 1.28832 22.4385 1.93528 22.7245 2.70737C23.0104 3.47947 23.0158 4.32753 22.7397 5.1032C22.4635 5.87886 21.9234 6.53273 21.2139 6.9504C20.5043 7.36808 19.6705 7.52296 18.8583 7.38794C18.0461 7.25293 17.3072 6.83663 16.7709 6.21187L7.34101 10.5914C7.55779 11.2784 7.55779 12.0155 7.34101 12.7025L16.7709 17.082C17.3378 16.4227 18.1292 15.9974 18.9918 15.8884C19.8545 15.7794 20.7268 15.9945 21.4399 16.492C22.1529 16.9895 22.6558 17.7341 22.8512 18.5813C23.0466 19.4285 22.9205 20.3181 22.4974 21.0777C22.0743 21.8372 21.3842 22.4127 20.561 22.6924C19.7378 22.9722 18.84 22.9364 18.0417 22.592C17.2433 22.2476 16.6013 21.6191 16.24 20.8282C15.8786 20.0374 15.8237 19.1406 16.0859 18.3116L6.65601 13.9321C6.18919 14.4761 5.56696 14.8642 4.87302 15.044C4.17908 15.2238 3.44672 15.1867 2.77446 14.9378C2.1022 14.6889 1.52229 14.2401 1.11273 13.6518C0.703184 13.0634 0.483643 12.3638 0.483643 11.6469C0.483643 10.9301 0.703184 10.2304 1.11273 9.64206C1.52229 9.05372 2.1022 8.60491 2.77446 8.35602C3.44672 8.10713 4.17908 8.07009 4.87302 8.24989C5.56696 8.42969 6.18919 8.81771 6.65601 9.36173L16.0859 4.98224C15.9786 4.64068 15.9242 4.2847 15.9245 3.92667Z" fill="#494949"/>
            </svg>                            
            </button>
    `;
    break;

    case "application/vnd.oasis.opendocument.text":
    return `
    <div class="arch">
                <svg width="160" height="160" viewBox="0 0 160 160" class="mc-icon-template-content tile__preview tile__preview--icon">
                <title>1357054_617b.jpg</title>
                <defs>
                <rect id="mc-content-unknown-large-b" x="43" y="30" width="74" height="100" rx="4"></rect>
                <filter x="-.7%" y="-.5%" width="101.4%" height="102%" filterUnits="objectBoundingBox" id="mc-content-unknown-large-a">
                    <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                    <feColorMatrix values="0 0 0 0 0.858823529 0 0 0 0 0.870588235 0 0 0 0 0.88627451 0 0 0 1 0" in="shadowOffsetOuter1"></feColorMatrix>
                </filter>
                </defs>
                <g fill="none" fill-rule="evenodd">
                <g>
                    <use fill="#000" filter="url(#mc-content-unknown-large-a)" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mc-content-unknown-large-b"></use>
                    <use fill="#F7F9FA" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mc-content-unknown-large-b"></use>
                </g>
                </g>
                </svg>
            </div>
            <a class="botao4" id="abrir${key}" type="button">
                Abrir
            </a>

            <button type=button class="icon" id="${key}">
                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7033 14.3901L15.9813 10.112M11.7033 14.3901V1.55603V14.3901ZM11.7033 14.3901L7.42529 10.112L11.7033 14.3901Z" stroke="#494949" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.0083 16.5291L1.67246 19.1868C1.78813 19.6495 2.05515 20.0603 2.43109 20.3539C2.80703 20.6475 3.27031 20.807 3.7473 20.8071H19.6593C20.1363 20.807 20.5996 20.6475 20.9756 20.3539C21.3515 20.0603 21.6185 19.6495 21.7342 19.1868L22.3983 16.5291" stroke="#494949" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>                                                    
            </button>
            <button type="button" class="icon" id="share${key}">
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.9245 3.92667C15.9244 3.10332 16.2138 2.30614 16.7421 1.67462C17.2704 1.04309 18.0039 0.617437 18.8144 0.472119C19.6248 0.326801 20.4605 0.471075 21.1753 0.8797C21.8901 1.28832 22.4385 1.93528 22.7245 2.70737C23.0104 3.47947 23.0158 4.32753 22.7397 5.1032C22.4635 5.87886 21.9234 6.53273 21.2139 6.9504C20.5043 7.36808 19.6705 7.52296 18.8583 7.38794C18.0461 7.25293 17.3072 6.83663 16.7709 6.21187L7.34101 10.5914C7.55779 11.2784 7.55779 12.0155 7.34101 12.7025L16.7709 17.082C17.3378 16.4227 18.1292 15.9974 18.9918 15.8884C19.8545 15.7794 20.7268 15.9945 21.4399 16.492C22.1529 16.9895 22.6558 17.7341 22.8512 18.5813C23.0466 19.4285 22.9205 20.3181 22.4974 21.0777C22.0743 21.8372 21.3842 22.4127 20.561 22.6924C19.7378 22.9722 18.84 22.9364 18.0417 22.592C17.2433 22.2476 16.6013 21.6191 16.24 20.8282C15.8786 20.0374 15.8237 19.1406 16.0859 18.3116L6.65601 13.9321C6.18919 14.4761 5.56696 14.8642 4.87302 15.044C4.17908 15.2238 3.44672 15.1867 2.77446 14.9378C2.1022 14.6889 1.52229 14.2401 1.11273 13.6518C0.703184 13.0634 0.483643 12.3638 0.483643 11.6469C0.483643 10.9301 0.703184 10.2304 1.11273 9.64206C1.52229 9.05372 2.1022 8.60491 2.77446 8.35602C3.44672 8.10713 4.17908 8.07009 4.87302 8.24989C5.56696 8.42969 6.18919 8.81771 6.65601 9.36173L16.0859 4.98224C15.9786 4.64068 15.9242 4.2847 15.9245 3.92667Z" fill="#494949"/>
            </svg>                            
            </button>
            `;
    default:
    return `
    <div class="arch">
            <svg width="160" height="160" viewBox="0 0 160 160" class="mc-icon-template-content tile__preview tile__preview--icon">
            <title>1357054_617b.jpg</title>
            <defs>
            <rect id="mc-content-unknown-large-b" x="43" y="30" width="74" height="100" rx="4"></rect>
            <filter x="-.7%" y="-.5%" width="101.4%" height="102%" filterUnits="objectBoundingBox" id="mc-content-unknown-large-a">
                <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                <feColorMatrix values="0 0 0 0 0.858823529 0 0 0 0 0.870588235 0 0 0 0 0.88627451 0 0 0 1 0" in="shadowOffsetOuter1"></feColorMatrix>
            </filter>
            </defs>
            <g fill="none" fill-rule="evenodd">
            <g>
                <use fill="#000" filter="url(#mc-content-unknown-large-a)" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mc-content-unknown-large-b"></use>
                <use fill="#F7F9FA" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mc-content-unknown-large-b"></use>
            </g>
            </g>
        </svg>
    </div>
            <div class="botao4" id="abrir${key}" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Abrir
            </div>

            <button type=button class="icon" id="${key}">
                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7033 14.3901L15.9813 10.112M11.7033 14.3901V1.55603V14.3901ZM11.7033 14.3901L7.42529 10.112L11.7033 14.3901Z" stroke="#494949" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.0083 16.5291L1.67246 19.1868C1.78813 19.6495 2.05515 20.0603 2.43109 20.3539C2.80703 20.6475 3.27031 20.807 3.7473 20.8071H19.6593C20.1363 20.807 20.5996 20.6475 20.9756 20.3539C21.3515 20.0603 21.6185 19.6495 21.7342 19.1868L22.3983 16.5291" stroke="#494949" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>                                                    
            </button>
            <button type="button" class="icon" id="share${key}">
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.9245 3.92667C15.9244 3.10332 16.2138 2.30614 16.7421 1.67462C17.2704 1.04309 18.0039 0.617437 18.8144 0.472119C19.6248 0.326801 20.4605 0.471075 21.1753 0.8797C21.8901 1.28832 22.4385 1.93528 22.7245 2.70737C23.0104 3.47947 23.0158 4.32753 22.7397 5.1032C22.4635 5.87886 21.9234 6.53273 21.2139 6.9504C20.5043 7.36808 19.6705 7.52296 18.8583 7.38794C18.0461 7.25293 17.3072 6.83663 16.7709 6.21187L7.34101 10.5914C7.55779 11.2784 7.55779 12.0155 7.34101 12.7025L16.7709 17.082C17.3378 16.4227 18.1292 15.9974 18.9918 15.8884C19.8545 15.7794 20.7268 15.9945 21.4399 16.492C22.1529 16.9895 22.6558 17.7341 22.8512 18.5813C23.0466 19.4285 22.9205 20.3181 22.4974 21.0777C22.0743 21.8372 21.3842 22.4127 20.561 22.6924C19.7378 22.9722 18.84 22.9364 18.0417 22.592C17.2433 22.2476 16.6013 21.6191 16.24 20.8282C15.8786 20.0374 15.8237 19.1406 16.0859 18.3116L6.65601 13.9321C6.18919 14.4761 5.56696 14.8642 4.87302 15.044C4.17908 15.2238 3.44672 15.1867 2.77446 14.9378C2.1022 14.6889 1.52229 14.2401 1.11273 13.6518C0.703184 13.0634 0.483643 12.3638 0.483643 11.6469C0.483643 10.9301 0.703184 10.2304 1.11273 9.64206C1.52229 9.05372 2.1022 8.60491 2.77446 8.35602C3.44672 8.10713 4.17908 8.07009 4.87302 8.24989C5.56696 8.42969 6.18919 8.81771 6.65601 9.36173L16.0859 4.98224C15.9786 4.64068 15.9242 4.2847 15.9245 3.92667Z" fill="#494949"/>
            </svg>                            
            </button>
    `;
}
}

getFileView(file, key) {
let li = document.createElement("li");

li.dataset.file = JSON.stringify(file);
li.className = 'col-xl-3 col-lg-4 col-md-6 col-sm-6 text-center arquivo';
li.id = 'li'+key;
let name = file.name
name = name.substring(0, name.indexOf('.'));
li.setAttribute("name", name);
li.innerHTML = `
    ${this.getFileIconView(file, key)}
`;
return li;
}

filters(){
$("#alfabetica").on('click', e=>{
    console.log('ordena');
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("arquivos");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        b = list.getElementsByTagName("LI");
        // Loop through all list items:
        for (i = 0; i < (b.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Check if the next item should
        switch place with the current item: */
        if (b[i].getAttribute('name').toLowerCase() > b[i + 1].getAttribute('name').toLowerCase()) {
            /* If next item is alphabetically lower than current item,
            mark as a switch and break the loop: */
            shouldSwitch = true;
            break;
        }
        }
        if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark the switch as done: */
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
        }
    }
        
})    
}

readFiles() {

    this.lastFolder = this.currentFolder.join('/');

    this.getFirebaseRef().on("value", (snapshot) => {
    var els = document.getElementsByClassName("arquivo");    
    let countDocs = 0;
    let createdDocs = false;
        

        //paginate Archives
    const numDocs = snapshot.numChildren()

    let perPage = 8
    const state = {
        page: 1,
        perPage,
        totalPage: Math.ceil(numDocs/perPage),
        maxVisibleButtons: 5
    }


    const html = {
        get(element){
            return document.querySelector(element)
        }
    }

    const controls = {
        eraseOlds(){
            if(((state.page-1)*(state.perPage)+state.perPage) > numDocs){
                list.delete((state.page-1)*(state.perPage), numDocs)
            } else{
                list.delete((state.page-1)*(state.perPage), (state.page-1)*(state.perPage)+state.perPage)
            }
        },
        next() {
            this.eraseOlds()
            state.page++

            const lastPage = state.page > state.totalPage
            if(lastPage) {
                state.page--
            }
        },
        prev() {
            this.eraseOlds()
            state.page--
            if(state.page < 1){
                state.page++
            }
        },
        goTo(page) {
            this.eraseOlds()

            if(page < 1){
                page = 1
            }

            state.page = +page

            if(page > state.totalPage) {
                state.page = state.totalPage
            }

            
            
        },
        createListeners(){
            html.get('.first').addEventListener('click', () => {
                controls.goTo(1)
                update()
            })

            html.get('.last').addEventListener('click', () => {
                controls.goTo(state.totalPage)
                update()
            })

            html.get('.next').addEventListener('click', () => {
                controls.next()
                update()
            })

            html.get('.prev').addEventListener('click', () => {
                controls.prev()
                update()
            })
        }
    }

    const list = {
        create(start, end){
            if(createdDocs==true){
                console.log(start, end);
                for (var i = start; i < end; i++) {
                    els[i].style.display = 'block'; //second console output
                }
            }
        },
        update() {
            let page = state.page - 1
            let start = page*state.perPage
            let end = start + state.perPage
            if(end>numDocs){
                end = numDocs
            }


            list.create(start, end);
        },
        delete(start, end){
            for (var i = start; i < end; i++) {
                els[i].style.display = 'none'; //second console output
            }
        }
    }

    const buttons = {
        element: html.get('.numbers'),
        create(number) {
            const button = document.createElement('div')
            button.innerHTML = number;

            if(state.page == number){
                button.classList.add('active')
            }

            button.addEventListener('click', (event) => {
                const page = event.target.innerText
                controls.goTo(page)
                update()
            })

            buttons.element.appendChild(button)
        },
        update() {
            buttons.element.innerHTML = ""
            const {maxLeft, maxRight} = buttons.calculateMaxVisible()
            for(let page = maxLeft; page <= maxRight; page++){
                buttons.create(page)
            }
        },
        calculateMaxVisible(){
            const {maxVisibleButtons} = state
            let maxLeft = (state.page - Math.floor(maxVisibleButtons/2))
            let maxRight = (state.page + Math.floor(maxVisibleButtons/2))

            if(maxRight > state.totalPage) {
                maxLeft = state.totalPage - (maxVisibleButtons - 1)
                maxRight = state.totalPage

                if(maxLeft < 1) maxLeft = 1
            }

            if (maxLeft < 1){
                maxLeft = 1
                maxRight = maxVisibleButtons

                
            }

            return {maxLeft, maxRight}
        }
    }

    function update(){
        list.update();
        buttons.update()
    }

    function init(){
        update()
        controls.createListeners()
    }

    
        this.listFilesEl.innerHTML = "";
        snapshot.forEach((snapshotItem) => {

        let key = snapshotItem.key;
        let data = snapshotItem.val();

        //pegando url do arquivo
        var starsRef = this.storageRef.child('Velaumar/'+data.originName);

        starsRef.getDownloadURL()
        .then((url) => {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                let a = document.createElement('a');
                a.href = window.URL.createObjectURL(xhr.response);
                a.download = data.name;
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();   
                let blob = xhr.response;
            };
            xhr.open('GET', url);


            if (data.type) {
                let p = document.createElement('p');
                p.className = 'name-file';
                p.innerHTML = data.name;
                p.style.overflow = 'hidden';
                p.style.textOverflow = 'ellipsis';
                p.style.whiteSpace = 'nowrap';

                this.listFilesEl.appendChild(this.getFileView(data, key, url));
                document.querySelector("#li"+key + " .arch").appendChild(p);

                //click para baixar imagens
                let elArchive = document.querySelector("#"+key);
                elArchive.addEventListener('click', e=>{
                    xhr.send();
                })

                //Click para abrir imagens
                let modal = document.querySelector("#abrir"+key);
                modal.addEventListener(
                    'click', e=>{
                        document.querySelector("#modal-img").innerHTML = '';
                        document.querySelector("#nome-img-modal").innerHTML = data.name;

                        switch(data.type){
                            case 'application/pdf':
                                let doc = document.createElement('embed');
                                doc.setAttribute('src', url);
                                doc.type = data.type;
                                doc.width = '100%';
                                doc.height = '100%';
                                doc.className = 'doc-reveal';

                                document.querySelector("#modal-img").appendChild(doc);
                            break;

                            case "image/jpeg":
                            case "image/jpg":
                            case "image/png":
                            case "image/gif":
                                let doc2 = document.createElement('img');
                                doc2.setAttribute('src', url);
                                document.querySelector("#modal-img").appendChild(doc2);
                                doc2.className = 'doc-reveal';
                            break;

                            case "video/mp4":
                            case "video/quicktime":
                            case "video/mov":
                                let doc3 = document.createElement('video');
                                doc3.setAttribute('src', url);
                                doc3.type = data.type;
                                doc3.style.width = '100%';
                                doc3.style.height = 'auto';
                                doc3.controls = true;
                                document.querySelector("#modal-img").appendChild(doc3);
                                doc3.className = 'doc-reveal';
                            break;
                            case "application/vnd.oasis.opendocument.text":
                                let doc4 = document.querySelector("#abrir"+key);
                                doc4.href = url;
                        }

                        //criando botões do modal
                        let footer = document.createElement('div');
                        footer.className = 'modal-footer';
                        document.querySelector(".modal-body").appendChild(footer);    
                        //botão download
                        let download = document.createElement('button');
                        download.className = 'icon';
                        download.id = 'download'+key
                        download.innerHTML = `<svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.7033 14.3901L15.9813 10.112M11.7033 14.3901V1.55603V14.3901ZM11.7033 14.3901L7.42529 10.112L11.7033 14.3901Z" stroke="#494949" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1.0083 16.5291L1.67246 19.1868C1.78813 19.6495 2.05515 20.0603 2.43109 20.3539C2.80703 20.6475 3.27031 20.807 3.7473 20.8071H19.6593C20.1363 20.807 20.5996 20.6475 20.9756 20.3539C21.3515 20.0603 21.6185 19.6495 21.7342 19.1868L22.3983 16.5291" stroke="#494949" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>`;
                        document.querySelector(".modal-footer").appendChild(download);

                        //botão share
                        let share2 = document.createElement('button');
                        share2.className = 'icon';
                        share2.id = 'share2'+key
                        share2.innerHTML = `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.9245 3.92667C15.9244 3.10332 16.2138 2.30614 16.7421 1.67462C17.2704 1.04309 18.0039 0.617437 18.8144 0.472119C19.6248 0.326801 20.4605 0.471075 21.1753 0.8797C21.8901 1.28832 22.4385 1.93528 22.7245 2.70737C23.0104 3.47947 23.0158 4.32753 22.7397 5.1032C22.4635 5.87886 21.9234 6.53273 21.2139 6.9504C20.5043 7.36808 19.6705 7.52296 18.8583 7.38794C18.0461 7.25293 17.3072 6.83663 16.7709 6.21187L7.34101 10.5914C7.55779 11.2784 7.55779 12.0155 7.34101 12.7025L16.7709 17.082C17.3378 16.4227 18.1292 15.9974 18.9918 15.8884C19.8545 15.7794 20.7268 15.9945 21.4399 16.492C22.1529 16.9895 22.6558 17.7341 22.8512 18.5813C23.0466 19.4285 22.9205 20.3181 22.4974 21.0777C22.0743 21.8372 21.3842 22.4127 20.561 22.6924C19.7378 22.9722 18.84 22.9364 18.0417 22.592C17.2433 22.2476 16.6013 21.6191 16.24 20.8282C15.8786 20.0374 15.8237 19.1406 16.0859 18.3116L6.65601 13.9321C6.18919 14.4761 5.56696 14.8642 4.87302 15.044C4.17908 15.2238 3.44672 15.1867 2.77446 14.9378C2.1022 14.6889 1.52229 14.2401 1.11273 13.6518C0.703184 13.0634 0.483643 12.3638 0.483643 11.6469C0.483643 10.9301 0.703184 10.2304 1.11273 9.64206C1.52229 9.05372 2.1022 8.60491 2.77446 8.35602C3.44672 8.10713 4.17908 8.07009 4.87302 8.24989C5.56696 8.42969 6.18919 8.81771 6.65601 9.36173L16.0859 4.98224C15.9786 4.64068 15.9242 4.2847 15.9245 3.92667Z" fill="#494949"/>
                        </svg>`
                        document.querySelector('.modal-footer').appendChild(share2);

                        document.querySelector('#share2'+key).addEventListener('click', e=>{
                            navigator.clipboard.writeText(url);
                            $('.toast').toast('show');
                        })

                        document.querySelector("#download"+key).addEventListener('click', e=>{
                            xhr.send();
                        })


                        
                    }
                )
                
                //click para compartilhar
                let share = document.querySelector("#share"+key);
                share.addEventListener('click', e=>{
                    navigator.clipboard.writeText(url);
                    $('.toast').toast('show');
                })


            }
        })
        .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/object-not-found':
            console.log('objeto não encontrado');
            console.log(error);
            break;
            case 'storage/unauthorized':
            console.log('usuário sem acesso');
            console.log(error);
            break;
            case 'storage/canceled':
            console.log('requisição cancelada');
            console.log(error);
            break;

            // ...

            case 'storage/unknown':
            console.log('erro desconhecido');
            console.log(error);
            break;
        }
        });

        countDocs++;
        if(countDocs >= numDocs){
            createdDocs = true;
            let verifyEls = setInterval(()=>{
                if(els.length === numDocs){
                    init();
                    clearInterval(verifyEls);
                    document.querySelector('.controls').style.display = 'flex'
                }
            }, 500)
            
        }
        
        });
    });
    }

}

window.app = new DocsUserController()