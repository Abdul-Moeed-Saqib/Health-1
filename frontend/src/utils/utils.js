import { toast } from 'react-toastify'

const toastErrorTop = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER
    })
}

const toastErrorBot = (message) => {
    toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
    })
}

export { toastErrorTop, toastErrorBot }