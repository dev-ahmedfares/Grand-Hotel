import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 3/2;
  transform: scale(1.5);
`;

const Cabin = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  font-family: "sono";
  color: var(--color-grey-600);
`;

const Price = styled.div`
  font-family: "sono";
  font-weight: 500;
`;
const Discount = styled.div`
  font-family: "sono";
  font-weight: 600;
  color: var(--color-green-700);
`;

function CabinRow({ cabin,cabinIdx }) {
  const {
    image: img,
    maxCapacity,
    name,
    id: cabinId,
    regularPrice,
    discount,
    description,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();

  const { isCreating, addNewCabin } = useCreateCabin();

  function handleCreating() {
    addNewCabin({
      name: `Copy of ${name}`,
      image: img,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  }

  return (
    <>
      <Table.Row role="row">
        <Img src={img} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          

          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} cabinIdx={cabinIdx}/>

              <Menus.List id={cabinId}>

                <Menus.Button icon={<HiSquare2Stack />} disabled={isCreating} onClick={handleCreating}>Duplicate</Menus.Button>

                <Modal.Open opens={"edit"}>
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                
                <Modal.Open opens={"delete"}>
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>

              </Menus.List>

              <Modal.Window name={"delete"}>
                <ConfirmDelete
                  resourceName={"Cabin"}
                  onConfirm={() => deleteCabin(cabinId)}
                  disabled={isDeleting}
                />
              </Modal.Window>

              <Modal.Window name={"edit"}>
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
