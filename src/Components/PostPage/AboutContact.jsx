import React, { Component } from "react";

class AboutContact extends Component{
    state = {
        fullName: '',
        email: '',
        phoneNumber: '',
        message: '',
        emailStatus: ''
    };

    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }

    //Submit the form
    handleSubmit = (e) => {
        e.preventDefault();
        const {fullName, email, phoneNumber, message} = this.state;

        // reset the fields
        this.setState({
            fullName: '',
            email: '',
            phoneNumber: '',
            message: '',
        });

        // $.ajax({
        //     url: '',
        //     type: 'POST',
        //     data:{
        //         'fullName':  fullName,
        //         'email':  email,
        //         'phoneNumber':  phoneNumber,
        //         'message':  message
        //     }
        // });
    }

    render(){
        const {fullName, email, phoneNumber, message, emailStatus} = this.state;
        return(
            <form className="vs--cform" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="lbl" htmlFor='fullNameInput'>Full Name <span className="txt-warning">*</span></label>
                    <input type="text" id="fullNameInput" value={fullName} onChange={this.handleChange('fullName')} />
                </div>
                <div className="flex-row">
                    <div className="w12 w-md-6">
                        <div className="form-group">
                            <label className="lbl" htmlFor='emailInput'>E-mail Address <span className="txt-warning">*</span></label>
                            <input type="text" id="emailInput" value={email} onChange={this.handleChange('email')} />
                        </div>
                    </div>
                    <div className="w12 w-md-6">
                        <div className="form-group">
                            <label className="lbl" htmlFor='phoneNumberInput'>Phone Number <span className="txt-option">(option)</span></label>
                            <input type="text" id="phoneNumberInput" value={phoneNumber} onChange={this.handleChange('phoneNumber')} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="lbl" htmlFor='messageInput'>Your Message</label>
                    <textarea id="messageInput" value={message} onChange={this.handleChange('message')} ></textarea>
                </div>
                <div className="form-group flex-center no-margin">
                    <button className="btn" type="submit">Send Message</button>
                </div>
            </form>
        )
    }
}

export default AboutContact;