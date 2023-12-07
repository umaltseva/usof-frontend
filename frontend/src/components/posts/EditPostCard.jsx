import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Send } from "react-bootstrap-icons";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getAllCategories } from '../../services/categories';
import { updatePostById, getPosts } from '../../services/posts';
import { useNavigate } from 'react-router-dom';


const animatedComponents = makeAnimated();


function EditPostCard({post}) {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [selectedCategories, setSelectedCategories] = useState([post.categories]);
    const [Posts, setPosts] = useState([]);
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

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await getPosts();
            setPosts(posts);
        };
        fetchPosts();
    }, []);



    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const postCategories = selectedCategories.map(category => ({ id: category.value }));

        updatePostById({ postId: post.id, changes: { title, content, categories: postCategories } })
            .then(updatedPost => navigate(`/comments/${updatedPost.id}`))
    }

    return (
        <Card className='mx-auto' style={{ borderRadius: '25px', maxWidth: '100%' }}>
            <Card.Body>
                <Card.Title className="mb-2 text-center">Edit a question</Card.Title>
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="formBasicTitle" className="mb-1">
                        <Form.Label>Choose categories</Form.Label>
                        <Select class="form-select"
                            placeholder="Choose categories"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            value={[categories]}
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
                            <Send className="me-1" /> Save changes
                        </Button>
                    </div>


                </Form>
            </Card.Body>
        </Card>
    );
}

export default EditPostCard;
