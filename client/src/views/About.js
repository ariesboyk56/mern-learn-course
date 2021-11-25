import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const About = () => {
	return (
		<Row className='mt-5' style={{ marginRight: 0 }}>
			<Col className='text-center'>
				<Button
					variant='primary'
					target='_blank'
					href='https://www.facebook.com/'
					size='lg'
				>
					Visit you facebook now
				</Button>
			</Col>
		</Row>
	)
}

export default About
