import { toast } from 'react-toastify';

export const handleSuccess = (message) => {
    toast.success(message, {
        position: 'top-right',
       autoClose: 3000,
        style: {
            background: '#7fa580ff',
            color: '#fff',
        },
    });
}
export const handleError = (message) => {
    toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
        style: {
            background: '#bfbbbbff',
            color: '#fff',
        },
    });
}