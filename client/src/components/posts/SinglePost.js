import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Badge from "react-bootstrap/Badge"
import ActionButtons from './ActionButtons'


const SinglePost = ({post}) => {
  // Props
    // post: {_id, status, title, description, url}
    // console.log("test truyen props posts", post);
  return (
    <Card
		className='shadow'
		border={
			post.status === 'LEARNED'
				? 'success'
				: post.status === 'LEARNING'
				? 'warning'
				: 'danger'
		}
	>
		<Card.Body>
			<Card.Title>
				<Row>
					<Col>
						<p className='post-title'>{post.title}</p>
						<Badge
							pill
							variant={
								post.status === 'LEARNED'
									? 'success'
									: post.status === 'LEARNING'
									? 'warning'
									: 'danger'
							}
						>
							{post.status}
						</Badge>
					</Col>
					<Col className='text-right'>
						<ActionButtons url={post.url} _id={post._id} />
					</Col>
				</Row>
			</Card.Title>
			<Card.Text>{post.description}</Card.Text>
		</Card.Body>
	</Card>
  )
}

export default SinglePost
