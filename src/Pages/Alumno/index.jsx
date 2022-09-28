import './styles.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase/config'
import { getDocs, collection } from 'firebase/firestore/lite'

export default function Alumno() {

  const userData = JSON.parse(localStorage.getItem('logged'))
  const alumno = JSON.parse(localStorage.getItem('alumno'))
  const [workout, setWorkout] = useState()

  useEffect(() => {
    const collectionRef = collection(db, 'workouts')
    getDocs(collectionRef)
      .then((res) => {
        const data = res.docs.map((doc) => ({id: doc.id, ...doc.data()}))
        const filteredData = data.filter((item) => item.name === alumno.name)
        setWorkout(filteredData)
      })
  }, []);

  return (
    <div className='alumno-root'>
      <div className='header'>
        {
          alumno && <h1 className='headerTitulo'>{alumno.name}</h1>
        }
        <Link to='/alumno/crearRutina'>Crear nueva</Link>
      </div>
      <div className='main'>
        <h1 className='title'>Rutinas Anteriores</h1>
        <ul>
          {
            workout?.length ? (
              workout.map(item => (
                <li key={item.id}>
                  <Link to={`/workout/${item.id}`} >
                    <span>{item.date}</span>{item.woname}
                  </Link>
                </li>
              ))
            ) : (
              <li className='sinRutinas'>Todavía no tiene rutinas previas.</li>
            )
          }
        </ul>
      </div>
    </div>
  )
}