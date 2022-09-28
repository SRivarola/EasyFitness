import './styles.css'
import { useEffect, useState } from 'react'
import { Form, Formik  } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { db } from '../../firebase/config'
import { collection, getDocs } from 'firebase/firestore/lite'
import sweetAlert from '../../utils/alerts'
import FieldContainer from '../../Components/FieldContainer'

export default function Login() {

  const navigate = useNavigate()
  const [usersData, setUsersData] = useState()

  const initialValues = {
    email: '',
    password: ''
  }

  const handleSubmit = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
          const userFind = usersData.find(user => user.email === userCredential.user.email)
          const userData = {userId: userCredential.user.uid, email: userCredential.user.email, role: userFind.role} 
          localStorage.setItem('logged', JSON.stringify(userData))
          navigate('/', {replace: true})
      })
      .catch((err) => {
          err.code === 'auth/user-not-found' && sweetAlert('Usuario NO encontrado','error')
          err.code === 'auth/wrong-password' && sweetAlert('Contraseña ERRONEA', 'error')
      })
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('*email incorrecto').required('*email requerido'),
    password: Yup.string().length(8, '*la contraseña debe tener 8 caractéres').required('*contraseña requerida')
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
    <div className='login-root'>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {(formik) => (
          <Form onSubmit={formik.handleSubmit} className='loginForm'>
            <h3 className='titulo'>Login</h3>
            <FieldContainer
              label='Email'
              name='email' 
              placeholder={'Ingerese su email'} 
              error={formik.errors.email ? formik.errors.email : null} 
              touched={formik.touched.email ? formik.touched.email : null}
              classname='formContainer'
            />
            <FieldContainer 
              label='Password'
              name='password'
              placeholder='Ingrese su Password'
              error={formik.errors.password? formik.errors.password : null}
              touched={formik.touched.password? formik.touched.password : null}
              classname='formContainer'
            />
            <button type='submit' className='loginButuon' >LOGIN</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}