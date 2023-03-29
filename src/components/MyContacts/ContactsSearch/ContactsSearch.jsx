import css from './ContactsSearch.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterValue, getFilterValue } from 'redux/filterSlice';

const ContactsSearch = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);

  const onChange = e => {
    dispatch(setFilterValue(e.currentTarget.value));
  };

  return (
    <div className={css.group}>
      <label>Find contacts by name:</label>
      <input
        className={css.input}
        type="text"
        name="filter"
        value={filterValue}
        onChange={onChange}
        placeholder="Enter name"
      />
    </div>
  );
};

export default ContactsSearch;
