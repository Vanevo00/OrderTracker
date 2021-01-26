import React, { ChangeEvent, MouseEvent, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { createSupplier, hideSupplierModal } from '../redux/actions/supplierActions'

const AddSupplierModal = () => {
  const dispatch = useDispatch()
  const {
    showSupplierModal
  } = useSelector((state: RootStateOrAny) => state.supplierState)
  const [inputValues, setInputValues] = useState({
    name: '',
    abbreviation: ''
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e: MouseEvent) => {
    e.preventDefault()

    dispatch(createSupplier(inputValues))
  }

  return (
    <Modal
      show={showSupplierModal}
      onHide={() => dispatch(hideSupplierModal)}
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Přidat dodavatele
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Jméno dodavatele</Form.Label>
            <Form.Control type='text' placeholder='např. Microsoft' name='name' onChange={onChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Zkratka</Form.Label>
            <Form.Control type='text' placeholder='např. ms' name='abbreviation' onChange={onChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={() => dispatch(hideSupplierModal)}>Zavřít</Button>
        <Button variant='success' onClick={onSubmit}>Přidat</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddSupplierModal
