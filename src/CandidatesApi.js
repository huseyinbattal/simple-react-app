import React, { useState, useEffect } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { Link, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { UserInformations } from './UserInformations';
import UserPage from './UserPage';


const CandidatesApi = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users/")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setUsers(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    if (error) {
        return <div>

            {error.message}

        </div>;
    } else if (!isLoaded) {
        return <div> <Spinner animation="border" variant="primary" /></div>;
    } else {
        //console.log(users);
        let usersSort = [];
        for (let i = 0; i < users.length; i++) {
            usersSort.push(users[i].name);
        }


        // let usersSortNew = usersSort.sort((a,b)=>a-b);
        usersSort.sort();
        //console.log(usersSort);
        //console.log((usersSort).map((item, index, usersSort) => (item, index, usersSort)))
        // console.log(users.id)
     
        return (

            <div>
                <div className='userTable'>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Detail</th>
                            </tr>
                        </thead>

                    </Table>

                    {(users).map((user, index) => (

                        <Table style={{ border: "1px solid orange" }} key={user.id} responsive="sm">

                            <tbody>

                                <tr>
                                    <td valign="baseline">{user.id}</td>
                                    <td valign="baseline">{usersSort[index]}</td>
                                    <td valign="baseline">{user.phone}</td>
                                    <td valign="baseline"><Link to={`user/${user.id}`}><button style={{ color: "white", background: "orange" }}>Detail</button></Link>
                                        </td>
                                </tr>



                            </tbody>
                        </Table>
                    )


                    )}
                </div>
            </div>


        );

    }

}


export default CandidatesApi;