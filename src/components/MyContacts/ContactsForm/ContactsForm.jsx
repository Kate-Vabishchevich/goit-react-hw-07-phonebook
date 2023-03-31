import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import css from './ContactsForm.module.css';
import { toast } from 'react-toastify';

const init = { name: '', number: '' };

const ContactsForm = () => {
  const [form, setForm] = useState(init);
  const { name, number } = form;
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    if (
      contacts.find(
        contact =>
          contact.name.toLocaleLowerCase() === name.toLocaleLowerCase() ||
          contact.phone === number
      )
    ) {
      reset();
      return toast.error(`${name} or ${number} is already in contacts.`);
    } else {
      dispatch(addContact({ name, phone: number }));
      reset();
    }
  };

  const reset = () => {
    setForm(init);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.group}>
        <label className={css.label}>Name </label>
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />

        <label className={css.label}> Number</label>
        <input
          className={css.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />

        <button className={css.btn} type="submit">
          Add contact
        </button>
      </div>
    </form>
  );
};

export default ContactsForm;
