import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getContacts } from 'redux/contactsSlice';
import css from './ContactsList.module.css';
import { getFilterValue } from 'redux/filterSlice';

const ContactsList = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const filter = useSelector(getFilterValue);

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    if (filtered.length === 0 && filter) {
      alert('There are no matches');
    }
    return filtered;
  };

  return (
    <>
      <ol className={css.list}>
        {filteredContacts().map(({ name, number, id }) => {
          return (
            <li className={css.item} key={id}>
              {name}: {number}
              <button
                className={css.btn}
                onClick={() => dispatch(deleteContact(id))}
                type="button"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default ContactsList;
