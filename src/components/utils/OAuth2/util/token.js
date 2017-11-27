export const hasTokenize = () => window.localStorage.getItem("isAuth") !== null

export const setTokenx = () => {
  window.localStorage.setItem("isAuth", true)

}
export const removeTokenx = () => {
  window.localStorage.removeItem("isAuth")
}
