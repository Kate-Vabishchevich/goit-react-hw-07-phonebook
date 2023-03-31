import css from './ContactsList.module.css';
import { toast } from 'react-toastify';
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

  const filteredContacts = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {isLoading && <Loader />}
      {onError && toast.error('Something wrong')}
      <ol className={css.list}>
        {filteredContacts.map(({ name, phone, id }) => {
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
