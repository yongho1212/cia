import React from 'react';
import { Form } from "react-bootstrap";
import "./uploadProduct.css";
import { useState } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UploadProduct = () => {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [date, setDate] = useState("");
    const [point, setPoint] = useState("");
    const [mobile, setMobile] = useState("");
    const navigate = useNavigate();

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/products/upload',
                {name, brand, date, point, mobile}
            ).then((res) => {
                console.log('success')
            })
        } catch (err) {
            console.log('failed');
            console.log(name, brand, date, point, mobile);
        }
        navigate("/Main");
    };

    return (
        <div>
            <Form onSubmit={handlePost}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="name"
                        placeholder="ItemName"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="brand"
                        placeholder="BrandName"
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="dueDate"
                        placeholder="Period"
                        onChange={(e) => setDate(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="point"
                        placeholder="Point"
                        onChange={(e) => setPoint(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="mobile"
                        placeholder="Mobile"
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </Form.Group>
                <div>
                    <Button variant="primary" type="Submit">
                        Upload Please!
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default UploadProduct;