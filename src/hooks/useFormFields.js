import { useState } from "react";


const useFormFields = (iniState) => {
    // form fields
    const [input, setInput] = useState(iniState);

    // handle input change
	const handleInputChange = (e) => {
		setInput((prevState) => ({
			...prevState,
			[e.target.name] : e.target.value
		}));
	}

    // reset form
    const resetForm = () => {
        setInput(iniState)
    }

  return {input, handleInputChange, resetForm, setInput};
}

export default useFormFields;