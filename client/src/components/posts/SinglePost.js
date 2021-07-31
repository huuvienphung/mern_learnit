import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ActionButtons from '../layout/ActionButtons';

const SinglePost = (props) => {
    const { title, description, status } = props.post;

    return (
        <Card
            border={
                status === 'LEARNED'
                    ? 'success'
                    : status === 'LEARNING'
                    ? 'warning'
                    : 'danger'
            }
        >
            <Card.Header>
                <Row>
                    <Col>
                        {title}{' '}
                        <Badge
                            pill
                            bg={
                                status === 'LEARNED'
                                    ? 'success'
                                    : status === 'LEARNING'
                                    ? 'warning'
                                    : 'danger'
                            }
                        >
                            {status}
                        </Badge>
                    </Col>
                    <Col xs='auto' style={{ textAlign: 'right' }}>
                        <ActionButtons post={props.post} />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default SinglePost;
