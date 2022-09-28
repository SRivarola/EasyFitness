import './styles.css'

export default function Rows({ lista, titulo }) {
  return (
    <ul className='ejercicios-lista'>
      <li className='titulo'>{titulo && titulo}</li>
      {
        lista.map((item, idx) => (
              <li key={idx} className='items'>{item}</li>
        ))
      }
    </ul>
  )
}