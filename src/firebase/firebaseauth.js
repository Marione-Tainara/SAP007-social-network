import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from './export.js';

const provider = new GoogleAuthProvider();
export const authentication = getAuth();
// criar um novo usuários
export function creatNewUser(email, password) {
  return createUserWithEmailAndPassword(authentication, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      return user;
    },
  );
}

// entrar com email e senha
export function signinPassword(email, password) {
  // sendEmailVerification(auth.currentUser);
  // eslint-disable-next-line no-shadow
  const authentication = getAuth();
  return signInWithEmailAndPassword(authentication, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      return user;
    },
  );
}
// entrar com o Google
export function googleLogin() {
  return signInWithPopup(authentication, provider).then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    //  const token = credential.accessToken;
    // const user = result.user;
    return credential;
  });
}
export function stateVerification(cb) {
  onAuthStateChanged(authentication, (user) => {
    cb(user != null); // function de sair veio do firebase
  }); // se tiver conectada é direcionada para o feed
}
// função sair
export function sair() {
  return signOut(authentication)
    .then(() => 'Logout')
    .catch((error) => error);
}
