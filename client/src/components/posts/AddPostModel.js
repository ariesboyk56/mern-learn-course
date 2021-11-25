import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";
import { useContext, useState } from "react";
const AddPostModel = () => {
  //State PostsContext
  const { setShowModal, showModal,addPost,setShowToast } = useContext(PostContext);

  // State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TOLEARN",
  });

  const { title, description, url } = newPost;
  const onChangeNewPostForm = (e) =>
    setNewPost({ ...newPost, [e.target.name]: e.target.value });


  const handleCloseModal = () => {
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "TOLEARN",
    });
    setShowModal(false);
  };
  // const handleOpenModal = () => setShowModal(true)

  //.....
  const onSubmit = async event => {
    event.preventDefault();
    const {success, message} = await addPost(newPost)
    handleCloseModal()
    setShowToast({show:true,message,type: success?"success":"danger"})
  }

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn ?</Modal.Title>
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
            onChange={onChangeNewPostForm}
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
            onChange={onChangeNewPostForm}
          />
        </Form.Group>
        <Form.Group className="my-4">
          <Form.Control
            type="text"
            placeholder="Youtube Tutorial URL"
            name="url"
            value={url}
            onChange={onChangeNewPostForm}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Learn
        </Button>
      </Modal.Footer>
      </Form>
      
    </Modal>
  );
};

export default AddPostModel;
