import React, { useState } from 'react';
import { Form, Label, Input, Button } from './ContactForm.styled'

const ContactForm = ({ onAddContact }) => {
    const [state, setState] = useState({
        name: '',
        number: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (state.name.trim() === '' || state.number.trim() === '') {
            alert('Введите имя и номер телефона.');
            return;
        }

        onAddContact(state.name.trim(), state.number.trim());

        setState({
            name: '',
            number: '',
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <Label>
                    Name:
                </Label>
                <Input
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleInputChange}
                    required
                />


                <Label>
                    Number:
                </Label>
                <Input
                    type="tel"
                    name="number"
                    value={state.number}
                    onChange={handleInputChange}
                    required
                />

            </div>

            <Button type="submit">Add contact</Button>
        </Form>
    );
};

export default ContactForm;