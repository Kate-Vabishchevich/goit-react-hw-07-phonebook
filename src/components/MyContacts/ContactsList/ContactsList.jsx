import css from './ContactsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/operations';
import {
  getFilterValue,
  getContacts,
  getIsLoading,
  getError,
} from 'redux/selectors';
import { useEffect } from 'react';
import Loader from '../Loader/Loader';

const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilterValue);
  const isLoading = useSelector(getIsLoading);
  const onError = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // const normalisedFilter = filter.toLowerCase();
  // const filteredContacts = contacts?.filter(item =>
  //   item.name.toLowerCase().includes(normalisedFilter)
  // );

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    if (filtered.length === 0 && filter) {
      alert('There are no matches');
    }
    if (onError) {
      alert('Something wrong');
    }
    return filtered;
  };

  return (
    <>
      {isLoading && <Loader />}
      <ol className={css.list}>
        {filteredContacts().map(({ name, phone, id }) => {
          return (
            <li className={css.item} key={id}>
              {name}: {phone}
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
