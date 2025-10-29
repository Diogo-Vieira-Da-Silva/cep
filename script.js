function carregaCEP() {
  // pega o valor, remove espaços e quaisquer caracteres não numéricos
  let cep = document.getElementById("CEP").value.trim().replace(/\D/g, '');

  // helper para limpar campos e esconder rótulos
  const clearFields = () => {
    const ids = ["Bairro", "Cidade", "Estado", "Regiao", "Complemento"];
    const labels = ["labelBairro", "labelCidade", "labelEstado", "labelRegiao", "labelComplemento"];
    ids.forEach(id => { const el = document.getElementById(id); if (el) el.textContent = ''; });
    labels.forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
  };

  // validação ANTES de montar a URL e chamar a API
  if (cep.length !== 8) {
    console.log("CEP inválido: precisa ter 8 dígitos");
    alert('CEP inválido. O CEP deve conter exatamente 8 dígitos numéricos.');
    clearFields();
    return; // sai antes do fetch
  }

  const url = `https://viacep.com.br/ws/${cep}/json/`;

  // referências aos elementos de valor e seus rótulos
  const bairro = document.getElementById("Bairro");
  const cidade = document.getElementById("Cidade");
  const estado = document.getElementById("Estado");
  const regiao = document.getElementById("Regiao");
  const complemento = document.getElementById("Complemento");

  const labelBairro = document.getElementById("labelBairro");
  const labelCidade = document.getElementById("labelCidade");
  const labelEstado = document.getElementById("labelEstado");
  const labelRegiao = document.getElementById("labelRegiao");
  const labelComplemento = document.getElementById("labelComplemento");

  fetch(url)
    .then(response => response.json())
    .then(dados => {
      // a API ViaCEP devolve { "erro": true } quando não encontra o CEP
      if (dados.erro) {
        console.log('CEP não encontrado');
        alert('CEP não encontrado. Verifique o número e tente novamente.');
        clearFields();
        return;
      }

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
    .catch(error => {
      // O .catch só é executado em erros de rede ou quando lançamos um erro.
      // Registramos o erro real para facilitar o debug.
      console.error("erro no carregamento do CEP:", error);
      alert('Erro ao carregar o CEP. Verifique sua conexão e tente novamente.');
    });
}


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