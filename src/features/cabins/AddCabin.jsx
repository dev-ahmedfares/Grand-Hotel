import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    // I use opens and name in case i want to use this Modal Another purpose like open Table not open Form than in this case i pass opens and name to compare B/W them and decide which purpose this modal will render and make it more reusable
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}


export default AddCabin;
