import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";

const REACT_APP_NEWS_API_ORG_URL_BREAKING_NEWS = process.env.REACT_APP_NEWS_API_ORG_URL_BREAKING_NEWS;
const REACT_APP_NEWS_API_ORG_URL_SEARCH = process.env.REACT_APP_NEWS_API_ORG_URL_SEARCH;
const REACT_APP_NEWS_API_ORG_API_KEY = process.env.REACT_APP_NEWS_API_ORG_API_KEY;

function NewsRow({ title, classes, withImages, withDescription, query, isBreaking }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const sourceURL = isBreaking
                    ? REACT_APP_NEWS_API_ORG_URL_BREAKING_NEWS
                    : REACT_APP_NEWS_API_ORG_URL_SEARCH;

                const response = await axios.get(sourceURL, {
                    headers: {
                        Authorization: `Bearer ${REACT_APP_NEWS_API_ORG_API_KEY}`,
                    },
                    params: {
                        q: query,
                        pageSize: 6,
                        country: 'us',
                    },
                });

                setArticles(response.data.articles || []);
                setIsLoaded(true);
            } catch (err) {
                setError('Error fetching news');
                console.error(err);
            }
        };

        fetchNews();
    }, [query, isBreaking]); // Proper dependencies

    return (
        <div className={classes}>
            <Container>
                {title && (
                    <h2 className="bg-dark text-white py-2 px-3 mb-3">
                        {title}
                    </h2>
                )}

                {isLoaded ? (
                    <Row>
                        {articles.map((article, i) => (
                            <Col lg={4} md={6} key={i} className="mb-3">
                                <Card style={{ height: '100%' }}>
                                    {withImages && <Card.Img variant="top" src={article.urlToImage} />}
                                    <Card.Body className="d-flex flex-column justify-content-between align-items-start">
                                        <div>
                                            <Card.Title>{article.title}</Card.Title>
                                            {withDescription && <Card.Text>{article.description}</Card.Text>}
                                        </div>
                                        {article.url && (
                                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                                                Read from the source
                                            </a>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div className="text-center py-5">
                        {error ? <p className="text-danger">{error}</p> : <Spinner animation="grow" />}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default NewsRow;
