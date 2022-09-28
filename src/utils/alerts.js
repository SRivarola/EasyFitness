import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function sweetAlert(message, icon, timer = 2000){
    MySwal.fire({
      title: <p>{message}</p>,
      icon: icon,
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true
    })
}

