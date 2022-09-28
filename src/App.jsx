import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion'
import { Home, Login, Register, Workout, Alumno, Error404, CrearNueva } from './Pages'
import Header from "./Components/Header";

const RequiredAuth = ({ children }) => {
  if(!localStorage.getItem('logged')){
    return <Navigate to='/login' replace={true} />
  }
  return children
}

const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
}

function App() {

  const location = useLocation()

  return (
    <AnimatePresence>
      <Header />
      <Routes location={location} key={location.pathname}>
        <Route 
          index element={
            <RequiredAuth>
              <motion.div
                className="page"
                initial='out'
                animate='in'
                exit='out'
                variants={pageTransition}
              >
                <Home />
              </motion.div>
            </RequiredAuth>
          } />

        <Route 
          path='/login' 
          element={<motion.div
                    className="page"
                    initial='out'
                    animate='in'
                    exit='out'
                    variants={pageTransition}
                  >
                    <Login />
                  </motion.div>} />

        <Route 
          path='/register' 
          element={<motion.div
                    className="page"
                    initial='out'
                    animate='in'
                    exit='out'
                    variants={pageTransition}
                  >
                     <RequiredAuth>
                      <Register />
                     </RequiredAuth>
                  </motion.div>} />
        
        <Route 
          path='/workout/:id' 
          element={<motion.div
                    className="page"
                    initial='out'
                    animate='in'
                    exit='out'
                    variants={pageTransition}
                  >
                     <RequiredAuth>
                      <Workout />
                     </RequiredAuth>
                  </motion.div>} />
        
        <Route 
          path='/alumno/:name' 
          element={<motion.div
                    className="page"
                    initial='out'
                    animate='in'
                    exit='out'
                    variants={pageTransition}
                  >
                    <RequiredAuth>
                      <Alumno />
                    </RequiredAuth>
                  </motion.div>} />
         
        <Route 
          path='/alumno/crearRutina' 
          element={<motion.div
                    className="page"
                    initial='out'
                    animate='in'
                    exit='out'
                    variants={pageTransition}
                  >
                    <RequiredAuth>
                      <CrearNueva />
                    </RequiredAuth>
                  </motion.div>} />

        <Route 
          path='/*' 
          element={<motion.div
                    className="page"
                    initial='out'
                    animate='in'
                    exit='out'
                    variants={pageTransition}
                  >
                    <Error404 />
                  </motion.div>} />

      </Routes>
    </AnimatePresence>
  );
}

export default App;
