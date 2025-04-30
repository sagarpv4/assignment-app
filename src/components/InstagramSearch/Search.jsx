import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchUsers } from '../providers/fetchUsers';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function InstagramSearch() {


    const [searchText, setSearchText] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleChange = (e) => {
        const input = e.target.value;
        const inputAlphanumericOnly = input.replace(/[^a-zA-Z0-9]/g, '');
        const inputTrimmed = inputAlphanumericOnly.slice(0, 30);
        setSearchText(inputTrimmed);
        if (inputTrimmed === '') {
            setHasSearched(false);
        }
    };


    const handleSearch = async () => {
        setHasSearched(true);
        try {

            let usersResponse = await fetchUsers(searchText);
            const users = usersResponse.response?.body?.users ?? [];
            setUsers(users);
        } catch (err) {
            setError(err.message);
            setUsers([]);
        }
    };

    const handlePaste = (e) => {
        e.preventDefault(); // Prevents pasting
    };

    return (
        <>
            <div>

                <div style={{ padding: '2rem' }}>
                    <h2 style={{ textAlign: 'left' }}>Search Input</h2>
                    <input
                        type="text"
                        value={searchText}
                        onChange={handleChange}
                        onPaste={handlePaste}
                        placeholder="Enter alphanumeric text"
                        maxLength={30}
                        style={{
                            padding: '0.5rem',
                            fontSize: '1rem',
                            width: '300px'
                        }}
                    />
                    <span style={{ margin: '10px', padding: '5px' }}>Max 30 characters</span>
                </div>

                <button onClick={handleSearch} style={{ padding: '0.5rem 1rem', textAlign: 'left', backgroundColor: "lightsteelblue" }}>
                    Search
                </button>
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                <Container className="mt-4">
                    {users && users.length > 0 &&
                        users.map((user, index) => (
                            <Row>
                                <Col md={4}>
                                    <Card style={{ width: '30rem' }} key={index}>
                                    <Card.Link href={user.profile_pic_url} target="_blank">
                                        👤
                                        </Card.Link>
                                        <Card.Text>User Name: <strong>{user.username}</strong> </Card.Text>
                                        <Card.Text>Full Name: <strong>{user.full_name}</strong> </Card.Text>
                                    </Card>
                                </Col>
                            </Row>
                        ))}

                    {hasSearched && users.length === 0 && <span> No Users Found</span>}
                </Container>
            </div>

        </>
    )
}


