import './styles.css'
import { useState } from 'react'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import { collection, addDoc } from 'firebase/firestore/lite'
import { db } from '../../firebase/config'
import sweetAlert from '../../utils/alerts';
import FieldContainer from '../../Components/FieldContainer';
import List from '../../Components/List';
import DayForm from '../../Components/FormDay';

const initialValues = {
  woname: '',
  estimulos: '',
  ejercicios: {
    Dia1: [''],
    Dia2: [''],
    Dia3: [''],
    Dia4: [''],
  },
  semana1: {
    Dia1: [''],
    Dia2: [''],
    Dia3: [''],
    Dia4: [''],
  },
  semana2: {
    Dia1: [''],
    Dia2: [''],
    Dia3: [''],
    Dia4: [''],
  },
  semana3: {
    Dia1: [''],
    Dia2: [''],
    Dia3: [''],
    Dia4: [''],
  },
  semana4: {
    Dia1: [''],
    Dia2: [''],
    Dia3: [''],
    Dia4: [''],
  },
}

export default function CrearNueva() {
  
  const date = new Date().toLocaleDateString()
  const alumno = JSON.parse(localStorage.getItem('alumno'))
  // const [datos, setDatos] = useState({
  //   date,
  //   email: alumno?.email,
  //   name: alumno?.name,
  //   woname: '',
  //   rutina: [],
  // })
  
  const handleSubmit = async (values) => {
    const { woname, ejercicios, semana1, semana2, semana3, semana4 } = values
    
    const collectionRef = collection(db, 'workouts')
    addDoc(collectionRef, {
      date: date,
      email: alumno?.email,
      name: alumno?.name,
      woname: woname,
      rutina: [{
        ejercicios: [{
          Dia1: ejercicios.Dia1[0] !== '' ? ejercicios.Dia1 : null,
          Dia2: ejercicios.Dia2[0] !== '' ? ejercicios.Dia2 : null,
          Dia3: ejercicios.Dia3[0] !== '' ? ejercicios.Dia3 : null,
          Dia4: ejercicios.Dia4[0] !== '' ? ejercicios.Dia4 : null,
        }],
        semana1: [{
          Dia1: semana1.Dia1[0] !== '' ? semana1.Dia1 : null,
          Dia2: semana1.Dia2[0] !== '' ? semana1.Dia2 : null,
          Dia3: semana1.Dia3[0] !== '' ? semana1.Dia3 : null,
          Dia4: semana1.Dia4[0] !== '' ? semana1.Dia4 : null,
        }],
        semana2: [{
          Dia1: semana2.Dia1[0] !== '' ? semana2.Dia1 : null,
          Dia2: semana2.Dia2[0] !== '' ? semana2.Dia2 : null,
          Dia3: semana2.Dia3[0] !== '' ? semana2.Dia3 : null,
          Dia4: semana2.Dia4[0] !== '' ? semana2.Dia4 : null,
        }],
        semana3: [{
          Dia1: semana3.Dia1[0] !== '' ? semana3.Dia1 : null,
          Dia2: semana3.Dia2[0] !== '' ? semana3.Dia2 : null,
          Dia3: semana3.Dia3[0] !== '' ? semana3.Dia3 : null,
          Dia4: semana3.Dia4[0] !== '' ? semana3.Dia4 : null,
        }],
        semana4: [{
          Dia1: semana4.Dia1[0] !== '' ? semana4.Dia1 : null,
          Dia2: semana4.Dia2[0] !== '' ? semana4.Dia2 : null,
          Dia3: semana4.Dia3[0] !== '' ? semana4.Dia3 : null,
          Dia4: semana4.Dia4[0] !== '' ? semana4.dia4 : null,
        }]
      }],
    })
      .then(res => {
        sweetAlert('rutina guardada', 'success', 1500)
      })
      .catch(err => {
        sweetAlert('no se pudo guardar la rutina, intente nuevamente', 'error')
      })
  }
  
  return (
    <div className='crearNueva-Root'>
      <div className='tituloContainer'>
        <h1 className='titulo'>{alumno?.name}</h1>
      </div>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {
          (formik) => (
            <Form onSubmit={formik.handleSubmit} className='form'>
              <FieldContainer 
                label='Nombre de la rutina:'
                name='woname' 
                placeholder='Nombre de la rutina...'
                classname='divForm'
              />  
              <FieldContainer 
                label='Cantidad de estumulos semanales'
                name='estimulos' 
                placeholder='Nombre de la rutina...'
                classname='divForm'
                select='select'
              >
                <option value={0}>...</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </FieldContainer>  
              <div  className='divForm'>
                {
                  formik.values.estimulos > 0 &&
                  <div className='dayForm'>
                    <List titulo1='Dia 1' />              
                    <FieldArray name='ejercicios.Dia1'>
                      {({ remove, push }) => (
                        <DayForm dia={formik.values.ejercicios.Dia1} name='Dia1' remove={remove} push={push}/>
                      )}
                    </FieldArray>
                  </div>
                }
                {
                  formik.values.estimulos > 1 &&
                  <div className='dayForm'>
                    <List titulo1='Dia 2' />               
                    <FieldArray name='ejercicios.Dia2'>
                      {({ remove, push }) => (
                        <DayForm dia={formik.values.ejercicios.Dia2} name='Dia2' remove={remove} push={push}/>
                      )}
                    </FieldArray>
                  </div>
                }
                {
                  formik.values.estimulos > 2 &&
                  <div className='dayForm'>
                    <List titulo1='Dia 3' />           
                    <FieldArray name='ejercicios.Dia3'>
                      {({ remove, push }) => (
                        <DayForm dia={formik.values.ejercicios.Dia3} name='Dia3' remove={remove} push={push}/>
                      )}
                    </FieldArray>
                  </div>
                }
                {
                  formik.values.estimulos > 3 &&
                  <div className='dayForm'>
                    <List titulo1='Dia 4' />               
                    <FieldArray name='ejercicios.Dia4'>
                      {({ remove, push }) => (
                        <DayForm dia={formik.values.ejercicios.Dia4} name='Dia4' remove={remove} push={push}/>
                      )}
                    </FieldArray>
                  </div>
                }
              </div>
              <div className='buttonContainer'>
                <button type='submit' className='submitButton'>ENVIAR</button>
              </div>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}