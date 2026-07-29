/* ===============================
   SAFELINK
   script.js
================================= */

const resultado = document.getElementById("resultado");
const historyList = document.getElementById("historyList");

/* ===========================
      LISTAS DE RISCO
=========================== */

const palavrasPerigosas = [
    "pix",
    "login",
    "seguranca",
    "segurança",
    "ganhe",
    "premio",
    "prêmio",
    "gift",
    "bonus",
    "bônus",
    "brinde",
    "urgente",
    "clique",
    "gratis",
    "grátis",
    "free",
    "desconto",
    "promo",
    "oferta",
    "cartao",
    "cartão",
    "banco",
    "whatsapp"
];

const telefonesSuspeitos = [

    "11999999999",
    "21988888888",
    "31977777777",
    "47966666666",
    "85955555555"

];

/* ===========================
      VERIFICAR LINK
=========================== */

function checkURL(){

    const url = document
        .getElementById("urlInput")
        .value
        .trim()
        .toLowerCase();

    if(url===""){

        alert("Digite uma URL.");

        return;

    }

    let risco = 0;

    let motivos = [];

    if(linksPerigosos.includes(url)){

        risco += 10;

        motivos.push("Este link está cadastrado como suspeito.");

    }

    if(linksConfiaveis.includes(url)){

        mostrarResultado(

            url,

            0,

            ["Este domínio pertence a uma empresa conhecida."]

        );

        return;

    }

    if(!url.startsWith("https://")){

        risco += 2;

        motivos.push("Não utiliza HTTPS.");

    }

    if(url.includes("@")){

        risco += 2;

        motivos.push("Possui '@' na URL.");

    }

    if(url.length>80){

        risco++;

        motivos.push("URL muito longa.");

    }

    if(

        url.includes(".xyz") ||

        url.includes(".top") ||

        url.includes(".click") ||

        url.includes(".monster") ||

        url.includes(".zip")

    ){

        risco += 3;

        motivos.push("Domínio pouco confiável.");

    }

    palavrasPerigosas.forEach(palavra=>{

        if(url.includes(palavra)){

            risco++;

            motivos.push(`Palavra suspeita: ${palavra}`);

        }

    });

    mostrarResultado(url,risco,motivos);

}

/* ===========================
      VERIFICAR TELEFONE
=========================== */

function checkPhone(){

    let numero = document
        .getElementById("phoneInput")
        .value;

    numero = numero.replace(/\D/g,"");

    if(numero===""){

        alert("Digite um telefone.");

        return;

    }

    let risco = 0;

    let motivos=[];

    if(telefonesSuspeitos.includes(numero)){

        risco = 10;

        motivos.push("Número denunciado por usuários.");

    }

    if(numero.length<10){

        risco +=2;

        motivos.push("Número inválido.");

    }

    if(numero.startsWith("0800")){

        motivos.push("Número comercial.");

    }

    mostrarResultado(numero,risco,motivos);

}

/* ===========================
      RESULTADO
=========================== */

function mostrarResultado(texto,risco,motivos){

    let cor;
    let titulo;

    if(risco<=1){

        cor="#27AE60";

        titulo="🟢 Seguro";

    }

    else if(risco<=3){

        cor="#F4B400";

        titulo="🟡 Atenção";

    }

    else{

        cor="#E53935";

        titulo="🔴 Alto Risco";

    }

    let html=`

        <h2 style="color:${cor};margin-bottom:15px">

            ${titulo}

        </h2>

        <p>

            <strong>Consulta:</strong>

            ${texto}

        </p>

    `;

    if(motivos.length>0){

        html+="<br><strong>Motivos encontrados:</strong><ul>";

        motivos.forEach(item=>{

            html+=`<li>${item}</li>`;

        });

        html+="</ul>";

    }

    else{

        html+="<br>Nenhum comportamento suspeito encontrado.";

    }

    resultado.innerHTML=html;

    salvarHistorico(texto,titulo);

}

/* ===========================
      HISTÓRICO
=========================== */

function salvarHistorico(item,status){

    let historico=

    JSON.parse(localStorage.getItem("historico"))

    || [];

    historico.unshift({

        item:item,

        status:status,

        data:new Date().toLocaleString()

    });

    if(historico.length>10){

        historico.pop();

    }

    localStorage.setItem(

        "historico",

        JSON.stringify(historico)

    );

    carregarHistorico();

}

/* ===========================
      CARREGAR HISTÓRICO
=========================== */

function carregarHistorico(){

    const historico=

    JSON.parse(localStorage.getItem("historico"))

    || [];

    historyList.innerHTML="";

    historico.forEach(registro=>{

        const li=document.createElement("li");

        li.innerHTML=`

        <div>

            <strong>${registro.item}</strong>

            <br>

            <small>${registro.data}</small>

        </div>

        <span>

            ${registro.status}

        </span>

        `;

        historyList.appendChild(li);

    });

}

carregarHistorico();

/* ===========================
      BOTÃO TOPO
=========================== */

const botao=document.createElement("button");

botao.id="topButton";

botao.innerHTML="↑";

document.body.appendChild(botao);

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        botao.style.display="block";

    }

    else{

        botao.style.display="none";

    }

});

botao.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

/* ===========================
      ANIMAÇÕES
=========================== */

const elementos=document.querySelectorAll(

".card,.tip,.result,.history"

);

const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0)";

        }

    });

});

elementos.forEach(el=>{

    observer.observe(el);

});

/* ===========================
      BOAS-VINDAS
=========================== */

setTimeout(()=>{

    console.log("✔ SafeLink carregado com sucesso.");

},500);

/* ================================
   BANCO DE DADOS (SIMULAÇÃO)
================================ */

const linksPerigosos = [

    "http://pix-premio-login.xyz",
    "http://ganhe-celular.net",
    "http://seguranca-banco.click",
    "http://brinde-whatsapp.top",
    "http://promo-premio.fake",
    "http://atualize-conta.xyz",
    "http://suporte-pix.click",
    "http://iphone-gratis.top",
    "http://caixa-seguranca.xyz",
    "http://mercadolivre-promocao.click"

];

const linksConfiaveis = [

    "https://google.com",
    "https://github.com",
    "https://gov.br",
    "https://microsoft.com",
    "https://apple.com",
    "https://openai.com",
    "https://youtube.com",
    "https://wikipedia.org"

];


