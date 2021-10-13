import './App.css';
import React, { Component } from 'react';
import Form from './components/Form/Form';
import { v4 as uuidv4 } from 'uuid';
import Contact from './Contact';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import initContacts from './resources/initContacts.json';

class App extends Component {
  state = {
    contacts: [...initContacts],
    filter: '',
  };

  handleAddContact = data => {
    const { name, number } = data;
    const id = uuidv4();
    const newContact = new Contact(id, name, number);
    if (this.state.contacts.find(contact => newContact.equals(contact))) {
      alert(`${newContact.name} already exists in contacts`);
      return;
    }
    this.setState({
      contacts: [...this.state.contacts, newContact],
    });
  };

  handleDeleteContact = idContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idContact),
    }));
  };

  changeFilter = event => {
    const filterValue = event.currentTarget.value;
    this.setState({ filter: filterValue });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    if (filter) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()),
      );
    } else {
      return contacts;
    }
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <>
        <h2>Phonebook</h2>
        <Form onSubmit={this.handleAddContact} />
        {filteredContacts.length > 0 && (
          <div>
            <h2>Contacts</h2>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={this.handleDeleteContact}
            />
          </div>
        )}
      </>
    );
  }
}

export default App;
