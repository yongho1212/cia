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
    const [targetPlatform, setTargetPlatform] = useState("");
    const [category, setCategory] = useState("");
    const [period, setPeriod] = useState("");
    const [postType, setPostType] = useState("");
    const [point, setPoint] = useState("");
    const [applicationConditions, setApplicationConditions] = useState("");
    const [qualification, setQualification] = useState("");
    const [isCheck, setIsCheck] = useState("");
    const [detailPage, setDetailPage] = useState("");
    const [offersAndMissions, setOffersAndMissions] = useState("");
    const [photo, setPhoto] = useState("");
    const [mobile, setMobile] = useState("");
    const navigate = useNavigate();

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/products/upload',
                {name, brand, targetPlatform, category, period, postType,
                point, applicationConditions, qualification, isCheck,
                detailPage, offersAndMissions, photo, mobile}
            ).then((res) => {
                console.log('success')
            })
            console.log(name, brand, targetPlatform, category, period, postType,
                point, applicationConditions, qualification, isCheck,
                detailPage, offersAndMissions, photo, mobile);
        } catch (err) {
            console.log('failed');
            console.log(name, brand, targetPlatform, category, period, postType,
                point, applicationConditions, qualification, isCheck,
                detailPage, offersAndMissions, photo, mobile);
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
                        type="platform"
                        placeholder="TargetPlatform"
                        onChange={(e) => setTargetPlatform(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="category"
                        placeholder="Category"
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="period"
                        placeholder="Period"
                        onChange={(e) => setPeriod(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="postType"
                        placeholder="PostType"
                        onChange={(e) => setPostType(e.target.value)}
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
                        type="applicationConditions"
                        placeholder="ApplicationConditions"
                        onChange={(e) => setApplicationConditions(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="qulification"
                        placeholder="Qualification"
                        onChange={(e) => setQualification(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="isCheck"
                        placeholder="IsCheck?"
                        onChange={(e) => setIsCheck(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="detailPage"
                        placeholder="DetailPage"
                        onChange={(e) => setDetailPage(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="offersAndMissions"
                        placeholder="OffersAndMissions"
                        onChange={(e) => setOffersAndMissions(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="photo"
                        placeholder="Photo"
                        onChange={(e) => setPhoto(e.target.value)}
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