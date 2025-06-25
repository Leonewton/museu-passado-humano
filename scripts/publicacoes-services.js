const PUBLICACOES_PATH = "publicacoes";

// Função para criar uma nova publicação
function criarPublicacao(publicacao) {
  const novaRef = banco.ref(PUBLICACOES_PATH).push();
  return novaRef.set(publicacao)
    .then(() => novaRef.key)
    .catch((err) => {
      console.error("Erro ao criar publicação:", err);
      throw err;
    });
}

// Função para listar todas as publicações
function listarPublicacoes() {
  return banco.ref(PUBLICACOES_PATH).once("value")
    .then(snapshot => {
      const publicacoes = [];
      snapshot.forEach(child => {
        publicacoes.push({
          id: child.key,
          ...child.val()
        });
      });
      return publicacoes;
    })
    .catch((err) => {
      console.error("Erro ao listar publicações:", err);
      throw err;
    });
}

// Função para buscar uma publicação pelo ID
function buscarPublicacaoPorId(id) {
  return banco.ref(`${PUBLICACOES_PATH}/${id}`).once("value")
    .then(snapshot => snapshot.val())
    .catch((err) => {
      console.error("Erro ao buscar publicação:", err);
      throw err;
    });
}

/** Função para atualizar uma publicação existente
 * 
 * Por enquanto não foi implementada no código 
 */
function atualizarPublicacao(id, publicacaoAtualizada) {
  return banco.ref(`${PUBLICACOES_PATH}/${id}`).set(publicacaoAtualizada)
    .catch((err) => {
      console.error("Erro ao atualizar publicação:", err);
      throw err;
    });
}

// Função para deletar uma publicação
function deletarPublicacao(id) {
  return banco.ref(`${PUBLICACOES_PATH}/${id}`).remove()
    .catch((err) => {
      console.error("Erro ao deletar publicação:", err);
      throw err;
    });
}

export {
  criarPublicacao,
  listarPublicacoes,
  buscarPublicacaoPorId,
  atualizarPublicacao,
  deletarPublicacao
};