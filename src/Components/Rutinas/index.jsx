import './styles.css'
import { useEffect, useState } from 'react'
import { db } from "../../firebase/config"
import { getDocs, collection } from "firebase/firestore/lite"
import { Link } from 'react-router-dom'

export default function Rutinas() {

    const userData = JSON.parse(localStorage.getItem('logged'))
    const [rutinas, setRutinas] = useState(null)

    useEffect(() => {
        const collectionRef = collection(db, 'workouts')
        getDocs(collectionRef)
            .then(res => {
                const data = res.docs.map((doc) => ({id: doc.id, ...doc.data()}))
                const userWork = data.filter((doc => doc.email === userData.email))
                if(userWork.length === 0) {
                    setRutinas(null)
                } else {
                    setRutinas(userWork)
                }
            })     
            .catch(err => {
                console.log(err.message)
            })
    }, []);

  return (
    <div className='rutinas-root'>
        <h1 className='title'>MIS RUTINAS</h1>
        <ul>
            {
                rutinas ? (
                    rutinas.map((rutina, i) => (
                        <li key={i}>
                            <Link to={`/workout/${rutina.id}`}>
                                <span>{rutina.date}</span>{rutina.woname}
                            </Link>
                        </li>
                    ))
                ) : (
                    <>
                        <li>Todavía no hay rutinas guardadas.</li>
                        <li>Contacta a tu entrenador para comenzar.</li>
                    </>
                )

            }
        </ul>
    </div>
  )
}