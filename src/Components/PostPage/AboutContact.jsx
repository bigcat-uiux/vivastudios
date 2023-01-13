import { Axios } from "axios";
import { useState, useEffect } from "react";

const AboutContact = () => {
    // const url = '';
    const initialValues  = {
        fullName: '',
        email: '',
        phoneNumber: '',
        message: ''
    };

    const [formValue, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValue, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValue));
        setIsSubmit(true);
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // handleAxios(formValue)
            console.log('submitted')
        }
      }, [formErrors]);


    //   const handleAxios = (data) => {
    //     Axios.post(url,{
    //         fullName: data.fullName,
    //         email: data.email,
    //         phoneNumber: data.phoneNumber,
    //         message: data.message
    //     })
    //     .then(res => {
    //         console.log(res.data)
    //     })
    //   }

    const validate = (val) => {
        const errors = {};
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const fnameRegEx = /^[a-zA-Z ]*$/;

        if(!val.fullName){
            errors.fullName = "Full Name is required!";
        }else if(!fnameRegEx.test(val.fullName)){
            errors.fullName = "Please input correct full name";
        }

        if(!val.email){
            errors.email = "Email is required!";
        }else if(!emailRegEx.test(val.email)){
            errors.email = "Email provided is invalid";
        }

        return errors;
    }
    return (
        <>
            {/* <pre>{JSON.stringify(formValue, undefined, 2)}</pre> */}
            <form className="vs--cform" onSubmit={handleSubmit}>
                <div className={`form-group ${formErrors.fullName ? "error" : ""}`}>
                    <label className="lbl" htmlFor='fullNameInput'>Full Name <span className="txt-warning">*</span></label>
                    <input
                        type="text"
                        id="fullNameInput"
                        name="fullName"
                        value={formValue.fullName}
                        onChange={handleChange}
                    />
                    <span className="error-txt">{formErrors.fullName}</span>
                </div>
                <div className="flex-row">
                    <div className="w12 w-md-6">
                        <div className={`form-group ${formErrors.email ? "error" : ""}`}>
                            <label className="lbl" htmlFor='emailInput'>E-mail Address <span className="txt-warning">*</span></label>
                            <input
                                type="text"
                                id="emailInput"
                                name="email"
                                value={formValue.email}
                                onChange={handleChange}
                            />
                            <span className="error-txt">{formErrors.email}</span>
                        </div>
                    </div>
                    <div className="w12 w-md-6">
                        <div className="form-group">
                            <label className="lbl" htmlFor='phoneNumberInput'>Phone Number <span className="txt-option">(option)</span></label>
                            <input
                                type="text"
                                id="phoneNumberInput"
                                name="phoneNumber"
                                value={formValue.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="lbl" htmlFor='messageInput'>Your Message</label>
                    <textarea id="messageInput" name="message" value={formValue.message} onChange={handleChange} ></textarea>
                </div>
                <div className="form-group flex-center no-margin">
                    <button className="btn" type="submit">Send Message</button>
                </div>
            </form>
        </>
    )
}
export default AboutContact;