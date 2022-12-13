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

const toastSuccessTop = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_CENTER
    })
}

const toastSuccessBot = (message) => {
    toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    })
}

export { toastErrorTop, toastErrorBot, toastSuccessTop, toastSuccessBot }