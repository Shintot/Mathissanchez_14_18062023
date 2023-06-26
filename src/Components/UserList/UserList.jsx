import React, {useContext, useEffect, useState} from 'react';
import {useTable, useSortBy, usePagination, useFilters} from 'react-table';
import './UserList.css';
import {UserContext} from '../../UserContext';

const UserList = () => {
    const {users, selectedUser, setSelectedUser} = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [pageSize, setPageSize] = useState(5); // Ajout du state pour le nombre d'utilisateurs par page

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        const filteredUsers = users.filter(
            (user) =>
                user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(filteredUsers);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Prénom',
                accessor: 'firstName',
            },
            {
                Header: 'Nom',
                accessor: 'lastName',
            },
            {
                Header: 'Date de naissance',
                accessor: 'birthDate',
                Cell: ({value}) => value.split('T')[0],
            },
            {
                Header: 'Date de début',
                accessor: 'startDate',
                Cell: ({value}) => value.split('T')[0],
            },
            {
                Header: 'Rue',
                accessor: 'address.street',
            },
            {
                Header: 'Ville',
                accessor: 'address.city',
            },
            {
                Header: 'Code postal',
                accessor: 'address.zipCode',
            },
            {
                Header: 'Pays',
                accessor: 'address.country',
            },
            {
                Header: 'Département',
                accessor: 'department',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        pageOptions,
        page,
        state: {pageIndex},
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
        setPageSize: setTablePageSize,
    } = useTable(
        {
            columns,
            data: searchTerm ? searchResults : users,
            initialState: {pageIndex: 0, pageSize: pageSize},
        },
        useFilters,
        useSortBy,
        usePagination
    );

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const handleProfileClose = () => {
        setSelectedUser(null);
    };

    useEffect(() => {
        setTablePageSize(pageSize);
    }, [pageSize, setTablePageSize]);

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
    };

    return (
        <div className="user-list">
            <h2>Liste des employé(e)s</h2>
            <div className="tableflex">
                <div>
                    <input
                        type="text"
                        placeholder="Rechercher un utilisateur"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div>
                    <select value={pageSize} onChange={handlePageSizeChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </div>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                    const user = searchTerm ? searchResults[row.index] : row.original;

                    prepareRow(row);
                    return (
                        <tr
                            {...row.getRowProps()}
                            onClick={() => handleUserSelect(user)}
                            className={selectedUser === user ? 'selected' : ''}
                        >
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Précédent
                </button>
                <span className="colorpagination">
          Page{' '}
                    <strong>
            {pageIndex + 1} sur {pageOptions.length}
          </strong>{' '}
        </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Suivant
                </button>
            </div>

            {selectedUser && (
                <div className="user-profile">
                    <h3>
                        {selectedUser.firstName} {selectedUser.lastName}
                    </h3>
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
