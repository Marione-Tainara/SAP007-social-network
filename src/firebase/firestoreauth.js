import {
  getFirestore, // para usar os recursos do firestore
  collection, // parâmetro
  addDoc, // adiconar documentos na coleção
  getDocs, // pegar documentos da coleção
  orderBy, // ordenar por algum parâmetro
  query,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  // eslint-disable-next-line import/no-unresolved
} from './export.js';

export const db = getFirestore(); // do firestore

export async function addPosts(message, userEmail) {
  try { //se tudo der certo retorno o id do doc
    // eslint-disable-next-line max-len
    //  const documento referncia = await (pq é assincrona) addDOc function pronta (coleção (pega no Banco,// 'nome da coleção')  parametros a gente que escolhe
    const docRef = await addDoc(collection(db, 'posts'), { //aqui a coleção sao os posts
      message, //itens de um documento
      userEmail,
      date: new Date().toLocaleString('pt-br'), // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
      likes: [],
    });
    return docRef.id;
  } catch (e) { //catch é indicativo de erro o (e) contem os erros que estão dando
    // return e;
    console.log(e) // aqui é como se nem existisse testar depois
  }
}
export const getPosts = async () => {
  const postsArr = [];
  const sortingByDate = query(collection(db, 'posts'), orderBy('date')); //query é como se fosse uma filtragem ou ordenação, neste caso e ordenação esta sendo utilizado pra ordenar aqui esta viabilizando pegar pela data. Traz do mais recente pro mais antigo
  const querySnapshot = await getDocs(sortingByDate);
  querySnapshot.forEach((item) => {
    const pageFeed = item.data();// aqui consegue pegar a mensagem os likes e os itens do documento da coleção
    pageFeed.id = item.id;
    postsArr.push(pageFeed);
  });

  return postsArr;
};
export function deleteDocument(itemId) {
  return deleteDoc(doc(db, 'posts', itemId)); //deleta, recebe o id (pois quer que delete um post especifico) do post e pega a função do deleteDoc que puxa a coleção posts
}
export function updateDocument(itemId, message) {
  const docRefId = doc(db, 'posts', itemId); // pega o id do post e faz um update
  return updateDoc(docRefId, {
    message, //nesse caso altera especificamente a mensagem
  });
}
export async function liked(itemId, userEmail) {
  const postId = doc(db, 'posts', itemId);
  await updateDoc(postId, {
    likes: arrayUnion(userEmail),
  });
}
export async function unliked(itemId, userEmail) {
  const postId = doc(db, 'posts', itemId);
  await updateDoc(postId, {
    likes: arrayRemove(userEmail),
  });
}
