import React, {useContext, useState} from 'react';
import {BsChevronBarDown, BsChevronBarUp} from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CreateUser.css';
import {v4 as uuidv4} from 'uuid';
import Modal from 'basic-modal-shintot';
import Select from "react-dropdown";
import {UserContext} from '../../UserContext';
import fr from 'date-fns/locale/fr';

const UserForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const {users, setUsers} = useContext(UserContext);
    const [address, setAddress] = useState({
        street: '',
        city: '',
        zipCode: '',
        country: '',
    });
    const [isExpanded, setIsExpanded] = useState(false);
    const [country, setCountry] = useState('');


    const countries = [
        {value: 'France', label: 'France'},
        {value: 'United States', label: 'United States'},
        {value: 'Germany', label: 'Germany'},
        {value: 'Spain', label: 'Spain'},
    ];

    const departments = [
        {value: 'HR', label: 'HR'},
        {value: 'IT', label: 'IT'},
        {value: 'Marketing', label: 'Marketing'},
        {value: 'Finance', label: 'Finance'},
    ];


    const handleSave = () => {
        const user = {
            id: uuidv4(),
            firstName,
            lastName,
            department,
            birthDate: birthDate ? birthDate.toISOString() : '',
            startDate: startDate ? startDate.toISOString() : '',
            address: {
                street: address.street,
                city: address.city,
                zipCode: address.zipCode,
                country: address.country,
            },
        };

        setUsers(user);

        setShowModal(true);
    };


    const handleAddressChange = (e) => {
        setAddress({...address, [e.target.name]: e.target.value});
    };

    const handleToggleForm = () => {
        setIsExpanded(!isExpanded);
    };

    const handleCountryChange = (selectedOption) => {
        setCountry(selectedOption.value);
        setAddress({...address, country: selectedOption.value});
    };

    return (
        <div className={`container ${isExpanded ? 'expanded' : ''}`}>
            <img
                src="https://res.cloudinary.com/dtx8credj/image/upload/v1685371291/visuform_z1q8vu.svg"
                className="imgform"
                id="femme"
                alt=""
            />
            <h2 className="creation">Créer un employé(e)</h2>
            <form action="#" id="create-employee" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="first-name" className="espace">
                    Prénom
                </label>
                <input
                    type="text"
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="last-name" className="espace">
                    Nom
                </label>
                <input
                    type="text"
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <div className={`additional-fields ${isExpanded ? 'expanded' : ''}`}>
                    <label htmlFor="birth-date" className="espace">
                        Date d'anniversaire
                    </label>
                    <DatePicker
                        id="birth-date"
                        selected={birthDate}
                        onChange={(date) => setBirthDate(date)}
                        dateFormat="dd/MM/yyyy"
                        locale={fr}
                    />

                    <label htmlFor="start-date" className="espace">
                        Date de début
                    </label>
                    <DatePicker
                        id="start-date"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        locale={fr}
                    />

                    <label htmlFor="street" className="espace">
                        Rue
                    </label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={address.street}
                        onChange={handleAddressChange}
                    />

                    <label htmlFor="city" className="espace">
                        Ville
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={address.city}
                        onChange={handleAddressChange}
                    />

                    <label htmlFor="zip-code" className="espace">
                        Code postal
                    </label>
                    <input
                        type="text"
                        id="zip-code"
                        name="zipCode"
                        value={address.zipCode}
                        onChange={handleAddressChange}
                    />

                    <label htmlFor="country" className="espace">
                        Pays
                    </label>
                    <Select
                        className="react-dropdown-select "
                        options={countries}
                        value={countries.find(option => option.value === country)}
                        onChange={(selectedOption) => {
                            setCountry(selectedOption.value);
                            setAddress({...address, country: selectedOption.value});
                        }}
                    />
                </div>

                <label htmlFor="department" className="espace">
                    Pôle
                </label>
                <Select
                    className="react-dropdown-select "
                    options={departments}
                    value={departments.find(option => option.value === department)}
                    onChange={(selectedOption) => setDepartment(selectedOption.value)}
                />


                <div className="toggle-form" onClick={handleToggleForm}>
                    {isExpanded ? <BsChevronBarUp/> : <BsChevronBarDown/>}
                </div>

                {isExpanded && <button onClick={handleSave}>Enregistrer</button>}
            </form>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Employé Créé</h2>
                        <button onClick={() => setShowModal(false)}>Fermer</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default UserForm;
