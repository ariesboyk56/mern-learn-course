import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { PostContext } from "../contexts/PostContext";
import SinglePost from "../components/posts/SinglePost";
import AddPostModel from "../components/posts/AddPostModel";
import UpdatePostModel from "../components/posts/UpdatePostModel";
import addIcon from "../assets/plus-circle-fill.svg";

const Dashboard = () => {
  // Context State
  const {
    postInitialState: { post, posts, postsLoading },
    getPosts,
    setShowModal,
    showToast: { show, message, type },
    setShowToast
  } = useContext(PostContext);
  //postInitialState: {posts, postsLoading}
  // console.log("postInitialState children posts", posts);

  const state = useSelector((state) => state.auth);
  const { username } = state.user;
  // console.log("postInitialState children auth", username);

  // Get all post
  useEffect(() => {
    getPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let body = null;
  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIT</Card.Title>
            <Card.Text>
              Click the button below to track your first skills to learn
            </Card.Text>
            <Button onClick={setShowModal.bind(this, true)} variant="primary">
              Learn
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        {/* Open Add Post Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowModal.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <h1>
      {body}
      <AddPostModel />

      {post!==null && <UpdatePostModel />}

      {/* After post is added, show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </h1>
  );
};

export default Dashboard;
