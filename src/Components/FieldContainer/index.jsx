import { Field  } from 'formik'

export default function FieldContainer({label, name, placeholder, error, touched, classname, select, children}) {
  return (
    <div className={classname}>
        <label className='label'>{label}</label>
        <Field
            name={name}
            type={name}
            placeholder={placeholder}
            className={error && touched && 'error'}
            as={select}
        >
            {children}
        </Field>
        <span className='errorMessage'>{error && touched && error}</span>
    </div>
  )
}
