import FormSearch from "../../Components/FormSearch"
import Rutinas from "../../Components/Rutinas"


export default function Home() {

  const userData = JSON.parse(localStorage.getItem('logged'))

  return (
    <>
      {
        userData.role === 'Cliente' &&
        <Rutinas />
      }
      {
        userData.role === 'Personal' &&
        <FormSearch />
      }
    </>
  )
}