import React, {useContext, useEffect, useState} from 'react';
import './UserList.css';
import {BsFillArrowDownRightSquareFill, BsChevronDoubleLeft, BsChevronDoubleRight} from 'react-icons/bs';
import {UserContext} from '../../UserContext';


const UserList = () => {
    const {users, selectedUser, setUsers, setSelectedUser} = useContext(UserContext); // Utilisation du contexte

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('recent');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);


    useEffect(() => {
        const userList = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(userList);
    }, [setUsers]);


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (e) => {
        setSortOption(e.target.value);
    };

    const handleSortButton = () => {
        setSortOption(sortOption === 'recent' ? 'oldest' : 'recent');
    };

    const handleSortAlpha = (e) => {
        setSortOption(e.target.value);
    };

    const sortOptionsAlpha = ['asc', 'desc'];

    const renderSortOptionsAlpha = sortOptionsAlpha.map((option) => (
        <option key={option} value={option}>
            {option === 'asc' ? 'A à Z' : 'Z à A'}
        </option>
    ));


    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const handleProfileClose = () => {
        setSelectedUser(null);
    };

    const filteredUsers = users.filter((user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sortOption === 'recent') {
            return new Date(b.startDate) - new Date(a.startDate);
        } else if (sortOption === 'oldest') {
            return new Date(a.startDate) - new Date(b.startDate);
        } else if (sortOption === 'asc') {
            return a.firstName.localeCompare(b.firstName);
        } else if (sortOption === 'desc') {
            return b.firstName.localeCompare(a.firstName);
        } else {
            return 0;
        }
    });


    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
    Array.from({length: totalPages}, (_, index) => index + 1);
    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="user-list">
            <h2>Liste des employé(e)s</h2>
            <div className="flex">
                <input
                    type="text"
                    placeholder="Rechercher un utilisateur"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div className="sort-select">
                    <label>Trier par :</label>
                    <select value={sortOption} onChange={handleSort}>
                        <option value="recent">Plus récent</option>
                        <option value="oldest">Plus ancien</option>
                        <optgroup label="Tri alphabétique">
                            {renderSortOptionsAlpha}
                        </optgroup>
                    </select>
                </div>

            </div>
            <table>
                <thead>
                <tr>
                    <th>
                        Nom <BsFillArrowDownRightSquareFill onClick={handleSortButton}/>
                    </th>
                    <th>
                        Date de naissance <BsFillArrowDownRightSquareFill onClick={handleSortButton}/>
                    </th>
                    <th>
                        Date de début <BsFillArrowDownRightSquareFill onClick={handleSortButton}/>
                    </th>
                    <th>
                        Rue <BsFillArrowDownRightSquareFill onClick={handleSortButton}/>
                    </th>
                    <th>
                        Ville <BsFillArrowDownRightSquareFill onClick={handleSortButton}/>
                    </th>
                    <th>
                        Code postal <BsFillArrowDownRightSquareFill onClick={handleSortButton}/>
                    </th>
                    <th>
                        Pays <BsFillArrowDownRightSquareFill onClick={handleSortButton}/>
                    </th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map((user) => (
                    <tr key={user.id} onClick={() => handleUserSelect(user)}
                        className={selectedUser === user ? 'selected' : ''}>
                        <td>
                            {user.firstName} {user.lastName}
                        </td>
                        <td>{user.birthDate.split('T')[0]}</td>
                        <td>{user.startDate.split('T')[0]}</td>
                        <td>{user.address.street}</td>
                        <td>{user.address.city}</td>
                        <td>{user.address.zipCode}</td>
                        <td>{user.address.country}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={goToPreviousPage}>
                        <BsChevronDoubleLeft/>
                    </button>
                )}
                <div className="page-number">{currentPage}</div>
                {currentPage < totalPages && (
                    <button onClick={goToNextPage}>
                        <BsChevronDoubleRight/>
                    </button>
                )}
            </div>

            {selectedUser && (
                <div className="user-profile">
                    <h3>{selectedUser.firstName} {selectedUser.lastName}</h3>
                    <div>
                        <strong>Date de naissance:</strong> {selectedUser.birthDate.split('T')[0]}
                    </div>
                    <div>
                        <strong>Date de début:</strong> {selectedUser.startDate.split('T')[0]}
                    </div>
                    <div>
                        <strong>Rue:</strong> {selectedUser.address.street}
                    </div>
                    <div>
                        <strong>Ville:</strong> {selectedUser.address.city}
                    </div>
                    <div>
                        <strong>Code postal:</strong> {selectedUser.address.zipCode}
                    </div>
                    <div>
                        <strong>Pays:</strong> {selectedUser.address.country}
                    </div>
                    <button onClick={handleProfileClose}>Fermer</button>
                </div>
            )}
        </div>
    );
};

export default UserList;
