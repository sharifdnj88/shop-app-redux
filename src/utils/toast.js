import { toast } from 'react-toastify';


 // Create a error Toast
 export const errorToast = (msg, type="error") => {
    return toast[type](msg);  
  }

