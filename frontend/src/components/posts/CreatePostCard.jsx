import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Send } from "react-bootstrap-icons";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getAllCategories } from '../../services/categories';
import { createPost } from '../../services/posts';
import { useNavigate } from 'react-router-dom';


const animatedComponents = makeAnimated();


function CreatePostCard() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then(data => {
            const options = data.map(category => ({
                value: category.id, // assuming each category has an id
                label: category.title // assuming each category has a title
            }));
            setCategories(options);
        });
    }, []);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const postCategories = selectedCategories.map(category => ({ id: category.value }));

        createPost({ title, content, categories: postCategories })
            .then(post => navigate(`/comments/${post.id}`))
    }

    return (
        <Card className='mx-auto' style={{ borderRadius: '25px', maxWidth: '100%' }}>
            <Card.Body>
                <Card.Title className="mb-2 text-center">Ask a question</Card.Title>
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="formBasicTitle" className="mb-1">
                        <Form.Label>Choose categories</Form.Label>
                        <Select class="form-select"
                            placeholder="Choose categories"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            onChange={setSelectedCategories}
                            options={categories}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#e83283',
                                    primary: '#fff',
                                    neutral0: 'hotpink',
                                    neutral50: 'white',
                                    neutral70: 'white',
                                    neutral40: 'white',
                                    neutral60: 'white'

                                },
                            })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicTitle" className="mb-1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Type catching attention title" value={title} onChange={e => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Question</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Type your question" value={content} onChange={e => setContent(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Add image</Form.Label>
                        <Form.Control type="file" multiple />

                    </Form.Group>


                    <div className="d-flex justify-content-end">
                        <Button variant="success" type="submit" className="align-items-center">
                            <Send className="me-1" /> Publish
                        </Button>
                    </div>


                </Form>
            </Card.Body>
        </Card>
    );
}

export default CreatePostCard;
