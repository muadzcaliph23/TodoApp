"use client";

import { addTodo } from "@/api";
import { GoPlusCircle } from "react-icons/go";
import Modal from './Modal';
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState('');

  const handleSubmitNewTodo:FormEventHandler<HTMLFormElement> = async (e) =>{
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue
    })
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  }

  return (
    <div>
        <button onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full">Add New Task
        <GoPlusCircle className="ml-0.5" size={15} /></button>

        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={handleSubmitNewTodo}>
            <h3 className="font-bold text-lg">Add new task</h3>
            <div className="modal-action align-middle">
              <input
              value={newTaskValue} 
              onChange={e=>setNewTaskValue(e.target.value)}
              type="text" placeholder="Type here" 
              className="input input-bordered w-full" />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>

    </div>
  )
}

export default AddTask