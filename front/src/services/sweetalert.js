import Swal from 'sweetalert2'

export const successAlert = ({ text = '', title = '', showConfirmButton = false, position = 'top', timer = 1999 }) => {
  showAlert({ text, title, showConfirmButton, position, timer, iconColor: '#58BCDB' })
}

export const errorAlert = ({ text = '', title = '', showConfirmButton = false, timer = 1999, position = 'top' }) => {
  showAlert({ icon: 'error', text, title, showConfirmButton, position, timer, iconColor: '#C646AA' })
}

const showAlert = ({ icon = 'success', text = '', title = '', showConfirmButton = false, position = 'top', timer = 1999, iconColor }) => {
  Swal.fire({
    position,
    icon,
    title,
    showConfirmButton,
    timer,
    iconColor,
    text,
    toast: true,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
}
