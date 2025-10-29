  function carregaCEP() {
  let cep = document.getElementById("CEP").value;
  let url = `https://viacep.com.br/ws/${cep}/json/`;
  // referências aos elementos de valor e seus rótulos
  // usamos ids sem acento (Regiao) para evitar problemas com codificação
  let bairro = document.getElementById("Bairro");
  let cidade = document.getElementById("Cidade");
  let estado = document.getElementById("Estado");
  let regiao = document.getElementById("Regiao");
  let complemento = document.getElementById("Complemento");
  
  let labelBairro = document.getElementById("labelBairro");
  let labelCidade = document.getElementById("labelCidade");
  let labelEstado = document.getElementById("labelEstado");
  let labelRegiao = document.getElementById("labelRegiao");
  let labelComplemento = document.getElementById("labelComplemento");



  fetch(url)
    .then((response) => {
      return response.json();
    })

    .then((dados) => {
      // função auxiliar para preencher e mostrar/ocultar rótulo
      const setField = (valueEl, labelEl, value) => {
        if (value) {
          valueEl.textContent = value;
          labelEl.style.display = 'block';
        } else {
          valueEl.textContent = '';
          labelEl.style.display = 'none';
        }
      };

      setField(bairro, labelBairro, dados.bairro);
      setField(cidade, labelCidade, dados.localidade);
      setField(estado, labelEstado, dados.uf);
      // a API ViaCEP pode não retornar 'regiao' — usamos de forma segura
      setField(regiao, labelRegiao, dados.regiao || '');
      setField(complemento, labelComplemento, dados.complemento);

      console.log(dados);

    })

    .catch((error) => {
      console.log("erro no carregamento do CEP");
    });
}

carregaCEP();


// Projeto: "Buscador de Endereço (ViaCEP)"
// Objetivo: Criar uma página HTML simples onde o aluno digita um CEP (Código de Endereçamento Postal) e, ao clicar em um botão, a página consulta a API pública ViaCEP e preenche os campos de endereço (rua, bairro, cidade, estado) automaticamente.

// Por que este projeto?

// Relevância: É um recurso usado em 99% dos cadastros em sites brasileiros. É algo que vocês vão utilizar no mundo real.

// API Simples: A API ViaCEP é gratuita, pública, não requer chave (API Key) e é muito rápida.

// Foco nos Tópicos:

// DOM: Pegar o valor do input do CEP.

// API (fetch): Fazer a requisição para a API.

// JSON/Objetos JS: Tratar a resposta (que é um objeto JSON) e acessar suas propriedades (ex: dados.logradouro, dados.bairro).

// DOM (de novo): Preencher os campos do formulário com os valores do objeto.

//Link do VaiCEP: https://viacep.com.br/ e um exemplo de consulta: https://viacep.com.br/ws/90010001/json/

//Entrega em um repositório no github, com os arquivos e readme organizados.