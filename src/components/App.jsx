import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { GlobalStyle } from './GlobalStyle ';


const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [state, setState] = useState({
    contacts: initialContacts,
    filter: '',
  });

  const handleFilterChange = (e) => {
    setState({ ...state, filter: e.target.value });
  };

  const addContact = (name, number) => {
    const isNameExists = state.contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameExists) {
      alert(`Контакт ${name} уже присуцтвует в телефонной книге.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
      filter: '',
    }));
  };

  const handleDeleteContact = (id) => {
    setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
      filter: '',
    }));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = state.filter.toLowerCase();
    return state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <ContactForm onAddContact={addContact} />

      <h2>Contacts</h2>
      <Filter
        title="Find contacts by name: "
        value={state.filter}
        onChange={handleFilterChange}
      />
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={handleDeleteContact}
      />

      <GlobalStyle />
    </div>
  );
};

export default App;