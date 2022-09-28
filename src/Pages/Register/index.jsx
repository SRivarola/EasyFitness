import './styles.css'
import { useState, useEffect } from 'react'
import { Formik, Form  } from 'formik'
import * as Yup from 'yup'
import { db } from '../../firebase/config'
import { auth } from '../../firebase/config'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs } from 'firebase/firestore/lite'
import sweetAlert from '../../utils/alerts'
import FieldContainer from '../../Components/FieldContainer'

export default function Register() {

  const [usersData, setUsersData] = useState()
 
  const initialValues = {
    name: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    role: ''
  }

  const handleSubmit = (values, resetForm) => {
    const userFind = usersData.find(user => user.email === values.email)
    if(!userFind) {
      const collectionRef = collection(db, 'users')
      addDoc(collectionRef, values)
        .then(res => {
          createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              sweetAlert('usuario registrado', 'success', 1500)
              resetForm()
            })
            .catch(err => {
              sweetAlert('No se pudo registrar el usuario', 'error')
            })
        })
        .catch(err => {
          sweetAlert('No se pudo registrar el usuario', 'error')
        })
    } else {
      sweetAlert('Usuario existente', 'error')
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('*campo requerido'),
    age: Yup.number().required('*campo requerido'),
    gender: Yup.string().required('*campo requerido'),
    email: Yup.string().email('*mail invalido').required('*campo requerido'),
    password: Yup.string().length(8, 'La contraseña solo debe tener 8 caracteres').required('*campo requerido'),
    role: Yup.string().required('*campo requerido'),
  })

  useEffect(() => {
    const usersRef = collection(db, 'users')
    getDocs(usersRef)
      .then(res => {
        const users = res.docs.map((doc) => ({id: doc.id, ...doc.data()}))
        setUsersData(users)
      })
  }, []);

  return (
    <div className='register-root'>
      <Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema} 
        onSubmit={(values, {resetForm}) => handleSubmit(values, resetForm)}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <h3 className='titulo'>Regristrarse</h3>
            <div className='groupForm1'>
              <FieldContainer 
                label='Nombre completo'
                name='name'
                placeholder='Ingrese nombre completo'
                error={formik.errors.name ? formik.errors.name : null}
                touched={formik.touched.name ? formik.touched.name : null}
                classname='formContainer nombreCompleto'
              />
              <FieldContainer 
                label='Edad'
                name='age'
                placeholder='Ingrese su edad...'
                error={formik.errors.age? formik.errors.age : null}
                touched={formik.touched.age? formik.touched.age : null}
                classname='formContainer groupThin'
              />
              <FieldContainer
                label='Sexo'
                name='gender'
                error={formik.errors.gender ? formik.errors.gender : null}
                touched={formik.touched.gender? formik.touched.gender : null}
                classname='formContainer groupThin'
                select='select'
              >
                <option value="">Seleccione el sexo...</option>
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
              </FieldContainer>
              <FieldContainer
                label='Rol'
                name='role'
                error={formik.errors.role ? formik.errors.role : null}
                touched={formik.touched.role? formik.touched.role : null}
                classname='formContainer groupThin'
                select='select'
              >
                <option value="">Seleccione el rol...</option>
                <option value="Cliente">Cliente</option>
                <option value="Personal">Personal</option>
              </FieldContainer>
            </div>
            <FieldContainer 
              label='Email'
              name='email'
              placeholder='Ingrese su email'
              error={formik.errors.email? formik.errors.email : null}
              touched={formik.touched.email? formik.touched.email : null}
              classname='formContainer'
            />
            <FieldContainer 
              label='Password'
              name='password'
              placeholder='Ingrese su password'
              error={formik.errors.password? formik.errors.password : null}
              touched={formik.touched.password? formik.touched.password : null}
              classname='formContainer'
            />
            <div className='buttonContainer'>
              <button type='submit' >REGISTRAR</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}