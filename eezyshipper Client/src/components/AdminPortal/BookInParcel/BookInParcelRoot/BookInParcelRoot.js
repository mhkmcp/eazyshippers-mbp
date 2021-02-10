import React, { useState } from 'react';
import AddParcelToClient from '../AddParcelToClient/AddParcelToClient';
import SearchUser from '../SearchUser/SearchUser';

const BookInParcelRoot = () => {
    const [selectedUser, setSeletedUser] = useState('')
    return (
        <>
           {!selectedUser && <SearchUser setSeletedUser={setSeletedUser}></SearchUser>}
           {selectedUser && <AddParcelToClient selectedUser={selectedUser}></AddParcelToClient>}

        </>
    );
};

export default BookInParcelRoot;