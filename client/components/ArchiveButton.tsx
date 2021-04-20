import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import { IOrderPopulated } from '../../types/Order'
import { useDispatch } from 'react-redux'
import { archiveOrder } from '../redux/actions/orderActions'

interface Props {
  order: IOrderPopulated
}

const ArchiveButton = ({ order }: Props) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const {
    _id,
    name
  } = order

  const onArchive = () => {
    dispatch(archiveOrder(_id))
  }

  return (
    <>
    <div className='d-flex w-25 justify-content-center align-items-center'>
      <Button variant='primary' size='sm' onClick={() => setIsOpen(true)}><FontAwesomeIcon icon={faArchive}/></Button>
    </div>
      <Modal
        show={isOpen}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <p>skutečně chcete archivovat objednávku <strong>"{name}"</strong>?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='dark' onClick={() => setIsOpen(false)}>Zavřít</Button>
          <Button variant='primary' onClick={onArchive}>Archivovat</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ArchiveButton
