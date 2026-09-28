import { useContext } from 'react'
import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { autenticacao } from '@/services/Firebase'
import { AutenticacaoContexto } from '@/context/AutenticacaoContexto'

// As funções de autenticação são disponibilizadas como um Custom Hook
export function useAutenticacao() {

  // Esse hook depende do contexto AutenticacaoContexto para ser executado
  const autenticacaoContexto = useContext(AutenticacaoContexto)

  if (autenticacaoContexto === undefined) {
    throw new Error('Falta o <AutenticacaoProvider> na aplicação!')
  }

  // Garantida sua existência, recupera os dados gerados
  const { usuarioContexto, carregando, logarContexto, deslogarContexto } = autenticacaoContexto

  const criarAutenticacaoUsuario = async (email: string, senha: string, nome?: string): Promise<string> => {
    let retorno = 'sucesso'
    try {
      // Cria a autenticação do usuário e retorna suas credenciais
      const credencial = await createUserWithEmailAndPassword(autenticacao, email, senha)

      // Guarda o nome no perfil do Firebase
      if (nome) {
        await updateProfile(credencial.user, { displayName: nome })
      }

      // O Firebase loga o usuário automaticamente ao criar a conta; deslogamos
      // para o fluxo seguir: cadastro -> tela de login -> entrar.
      await signOut(autenticacao)
    } catch (error) {

      if (error instanceof FirebaseError) {

        switch (error.code) {
          case 'auth/email-already-in-use':
            retorno = 'E-mail já utilizado por outra conta.'
            break

          case 'auth/weak-password':
            retorno = 'A senha deve ter pelo menos 6 caracteres.'
            break

          case 'auth/invalid-email':
            retorno = 'E-mail inválido.'
            break

          default:
            retorno = `Erro na criação da autenticação do usuário! (${error.code})`
            break
        }
      } else {
        retorno = `Erro imprevisto! (${error})`
      }
    }
    return retorno
  }

  const validarUsuario = async (email: string, senha: string): Promise<string> => {
    let retorno = 'sucesso'
    try {
      // Verifica se o e-mail e a senha informados condizem com um usuário autenticado
      await signInWithEmailAndPassword(autenticacao, email, senha)
    } catch (error) {

      if (error instanceof FirebaseError) {

        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/invalid-credential':
            retorno = 'E-mail ou senha incorretos.'
            break

          default:
            retorno = `Erro na autenticação do usuário! (${error.code})`
            break
        }
      } else {
        retorno = `Erro imprevisto! (${error})`
      }
    }
    return retorno
  }

  const deslogar = async (): Promise<string> => {
    let retorno = 'sucesso'
    try {
      await signOut(autenticacao)
    } catch (error) {

      if (error instanceof FirebaseError) {

        switch (error.code) {
          default:
            retorno = `Erro ao deslogar o usuário! (${error.code})`
            break
        }
      } else {
        retorno = `Erro imprevisto! (${error})`
      }
    }
    return retorno
  }

  return { criarAutenticacaoUsuario, validarUsuario, deslogar, logarContexto, deslogarContexto, usuarioContexto, carregando }
}
