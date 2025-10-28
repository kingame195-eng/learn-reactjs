import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import './Home.css';

function Home() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        if (name && email) {
            alert(`Welcome ${name}! Email: ${email}`);
        } else {
            alert('Please fill all fields');
        }
    };

    return (
        <div className="home-page">
            <Header title="🚀 React Learning Journey" />

            <main className="main-content">
                <div className="container">
                    <h1>Welcome to React Components Demo</h1>

                    <div className="demo-section">
                        <h2>📝 Form Demo</h2>
                        <Input
                            label="Your Name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <Input
                            type="email"
                            label="Your Email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <div className="button-group">
                            <Button onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setName('');
                                    setEmail('');
                                }}
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;