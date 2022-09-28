import { Field } from 'formik'
import { IoTrash, IoAddCircle } from "react-icons/io5";

export default function DayForm({dia, name, remove, push}) {
  return (
    <div className='formDiaCompleto'>
        {
            dia.length > 0 &&
                dia.map((el, idx) => (
                    <div className='formDiaCompleto-campos' key={idx}>
                        <div className='campoEjercicios'>
                            <IoTrash onClick={() => {remove(idx)}} className='trashIcon' />
                            <Field name={`ejercicios.${name}[${idx}]`} className='field' placeholder='Nombre del ejercicio...' />
                        </div>
                        <Field name={`semana1.${name}[${idx}]`} className='fields' placeholder='Series y reps...'/>
                        <Field name={`semana2.${name}[${idx}]`} className='fields' placeholder='Series y reps...'/>
                        <Field name={`semana3.${name}[${idx}]`} className='fields' placeholder='Series y reps...'/>
                        <Field name={`semana4.${name}[${idx}]`} className='fields' placeholder='Series y reps...'/>
                    </div>
                ))
        }
        <div className='btnAddLineContainer'>
            <IoAddCircle onClick={() => {push('')}} className='inconAddLine' />
            <span className='textAddLine'>Agregar ejercicio</span>
        </div>
    </div>
  )
}
