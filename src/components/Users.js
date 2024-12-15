import {Card, Col, Container, Row} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from 'axios';

function Users({title, query, classes}){

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch users when the component mounts
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://randomuser.me/api/" + query);
                setUsers(response.data.results); // Set the fetched users
                // console.log(response.data.results)
            } catch (err) {
                setError(err.message); // Handle errors
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchUsers();
    }, [query]); // Empty dependency array ensures this runs once when mounted

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if(!loading){
        console.log(users)
    }

    return(
        <Container className={classes}>

            <h2 className="bg-dark text-white py-2 px-3 mb-3">
                {title}
            </h2>

            {
                (!loading && users.length > 0) ? (
                    <Row>
                        {
                            users.map((user, i) => (
                                <Col key={i} lg={2} md={2} sm={4} xs={6} className="mb-3">
                                    <Card style={{ height: '100%' }}>
                                        <Card.Img variant="top" src={user.picture.large} />
                                        <Card.Body>
                                            <Card.Title>{user.name.first} {user.name.last}</Card.Title>
                                            <Card.Text>
                                                <strong>Author</strong>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                ) : ('')
            }

        </Container>
    )
}

export default Users;