import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";
import { useContext, useState,useEffect } from "react";
const UpdatePostModel = () => {
  //State PostsContext
  const {
    postInitialState: { post },
    showUpdateModal,
    setShowUpdateModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  // State
  const [updatedPost, setUpdatedPost] = useState({ post });
	useEffect(() => setUpdatedPost(post), [post])

  const { title, description, url, status } = updatedPost;
  const onChangeUpdatePostForm = (e) =>
    setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });

  const handleCloseModal = () => {
		setUpdatedPost(post)
    setShowUpdateModal(false);
  };
  // const handleOpenModal = () => setShowModal(true)

  //.....
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    handleCloseModal();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <Modal show={showUpdateModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress ?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatePostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Control
              as="textarea"
              row={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeUpdatePostForm}
            />
          </Form.Group>
          <Form.Group className="my-4">
            <Form.Control
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={onChangeUpdatePostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onChangeUpdatePostForm}
            >
              <option value="TOLEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" type="submit">
            Learn
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModel;
