import './styles.css'
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { db } from "../../firebase/config"
import { getDoc, doc } from "firebase/firestore/lite"
import Rows from '../../Components/Rows'

export default function Workout() {

  const { id } = useParams()
  const [workout, setWorkout] = useState(false)

  useEffect(() => {
    const collectionRef = doc(db, 'workouts', id)
    getDoc(collectionRef)
    .then((res) => {
      setWorkout(res.data())
    })
  }, []);
  
  return (    
    <div className="workout-root">
      {
        workout &&
        <>
          <div className="header">
            <h1>{workout.name}</h1>
            <Link to={`/`}>Volver</Link>
          </div>
          <div className='rutinaContainer'>
            <div className='tituloContainer'>
              <h3 className='tituloRutina'>{workout.woname}</h3>
            </div>
            <div className='rutina'>
              {
                workout.rutina[0].ejercicios &&
                <div className='ejercicios'>
                  {
                    workout.rutina[0].ejercicios[0].Dia1 &&
                    <Rows lista={workout.rutina[0].ejercicios[0].Dia1} titulo={'Dia 1'}/>
                  }
                  {
                    workout.rutina[0].ejercicios[0].Dia2 &&
                    <Rows lista={workout.rutina[0].ejercicios[0].Dia2} titulo={'Dia 2'}/>
                  }
                  {
                    workout.rutina[0].ejercicios[0].Dia3 &&
                    <Rows lista={workout.rutina[0].ejercicios[0].Dia3} titulo={'Dia 3'}/>
                  }
                  {
                    workout.rutina[0].ejercicios[0].Dia4 &&
                    <Rows lista={workout.rutina[0].ejercicios[0].Dia4} titulo={'Dia 4'}/>
                  }
                  {
                    workout.rutina[0].ejercicios[0].Dia5 &&
                    <Rows lista={workout.rutina[0].ejercicios[0].Dia5} titulo={'Dia 5'}/>
                  }
                  {
                    workout.rutina[0].ejercicios[0].Dia6 &&
                    <Rows lista={workout.rutina[0].ejercicios[0].Dia6} titulo={'Dia 6'}/>
                  }
                </div>
              }
              {
                workout.rutina[0].semana1 &&
                <div className='semanas'>
                  {
                    workout.rutina[0].semana1[0].Dia1 &&
                    <Rows lista={workout.rutina[0].semana1[0].Dia1} titulo={'Semana 1'}/>
                  }
                  {
                    workout.rutina[0].semana1[0].Dia2 &&
                    <Rows lista={workout.rutina[0].semana1[0].Dia2} titulo={'Semana 1'}/>
                  }
                  {
                    workout.rutina[0].semana1[0].Dia3 &&
                    <Rows lista={workout.rutina[0].semana1[0].Dia3} titulo={'Semana 1'}/>
                  }
                  {
                    workout.rutina[0].semana1[0].Dia4 &&
                    <Rows lista={workout.rutina[0].semana1[0].Dia4} titulo={'Semana 1'}/>
                  }
                  {
                    workout.rutina[0].semana1[0].Dia5 &&
                    <Rows lista={workout.rutina[0].semana1[0].Dia5} titulo={'Semana 1'}/>
                  }
                  {
                    workout.rutina[0].semana1[0].Dia6 &&
                    <Rows lista={workout.rutina[0].semana1[0].Dia6} titulo={'Semana 1'}/>
                  }
                </div>
              }
              {
                workout.rutina[0].semana2 &&
                <div className='semanas claro'>
                  {
                    workout.rutina[0].semana2[0].Dia1 &&
                    <Rows lista={workout.rutina[0].semana2[0].Dia1} titulo={'Semana 2'}/>
                  }
                  {
                    workout.rutina[0].semana2[0].Dia2 &&
                    <Rows lista={workout.rutina[0].semana2[0].Dia2} titulo={'Semana 2'}/>
                  }
                  {
                    workout.rutina[0].semana2[0].Dia3 &&
                    <Rows lista={workout.rutina[0].semana2[0].Dia3} titulo={'Semana 2'}/>
                  }
                  {
                    workout.rutina[0].semana2[0].Dia4 &&
                    <Rows lista={workout.rutina[0].semana2[0].Dia4} titulo={'Semana 2'}/>
                  }
                  {
                    workout.rutina[0].semana2[0].Dia5 &&
                    <Rows lista={workout.rutina[0].semana2[0].Dia5} titulo={'Semana 2'}/>
                  }
                  {
                    workout.rutina[0].semana2[0].Dia6 &&
                    <Rows lista={workout.rutina[0].semana2[0].Dia6} titulo={'Semana 2'}/>
                  }
                </div>
              }
              {
                workout.rutina[0].semana3 &&
                <div className='semanas'>
                  {
                    workout.rutina[0].semana3[0].Dia1 &&
                    <Rows lista={workout.rutina[0].semana3[0].Dia1} titulo={'Semana 3'}/>
                  }
                  {
                    workout.rutina[0].semana3[0].Dia2 &&
                    <Rows lista={workout.rutina[0].semana3[0].Dia2} titulo={'Semana 3'}/>
                  }
                  {
                    workout.rutina[0].semana3[0].Dia3 &&
                    <Rows lista={workout.rutina[0].semana3[0].Dia3} titulo={'Semana 3'}/>
                  }
                  {
                    workout.rutina[0].semana3[0].Dia4 &&
                    <Rows lista={workout.rutina[0].semana3[0].Dia4} titulo={'Semana 3'}/>
                  }
                  {
                    workout.rutina[0].semana3[0].Dia5 &&
                    <Rows lista={workout.rutina[0].semana3[0].Dia5} titulo={'Semana 3'}/>
                  }
                  {
                    workout.rutina[0].semana3[0].Dia6 &&
                    <Rows lista={workout.rutina[0].semana3[0].Dia6} titulo={'Semana 3'}/>
                  }
                </div>
              }
              {
                workout.rutina[0].semana4 &&
                <div className='semanas claro'>
                  {
                    workout.rutina[0].semana4[0].Dia1 &&
                    <Rows lista={workout.rutina[0].semana4[0].Dia1} titulo={'Semana 4'}/>
                  }
                  {
                    workout.rutina[0].semana4[0].Dia2 &&
                    <Rows lista={workout.rutina[0].semana4[0].Dia2} titulo={'Semana 4'}/>
                  }
                  {
                    workout.rutina[0].semana4[0].Dia3 &&
                    <Rows lista={workout.rutina[0].semana4[0].Dia3} titulo={'Semana 4'}/>
                  }
                  {
                    workout.rutina[0].semana4[0].Dia4 &&
                    <Rows lista={workout.rutina[0].semana4[0].Dia4} titulo={'Semana 4'}/>
                  }
                  {
                    workout.rutina[0].semana4[0].Dia5 &&
                    <Rows lista={workout.rutina[0].semana4[0].Dia5} titulo={'Semana 4'}/>
                  }
                  {
                    workout.rutina[0].semana4[0].Dia6 &&
                    <Rows lista={workout.rutina[0].semana4[0].Dia6} titulo={'Semana 4'}/>
                  }
                </div>
              }
            </div>
          </div>
        </>
      }
    </div>
  )
}
