import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useRouter } from 'next/router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



export default function MainModal(props) {
    const router = useRouter();
    
    const handleDelete = async() => {
        const email = props.email;
        const software_id = props.software_id;
        console.log(email, software_id);
        try {
            const data =  await axios.delete(`https://linuix-app-api.vercel.app/api/softwares/${software_id}`, {data: {email: email}});
            console.log(data.data);
            router.push('/admin');
        }
        catch (err) {
            console.log(err.message);
        }
    }
  return (
    <div>
      <Modal
        open={props.open}
        onClose={()=>props.setOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          {props.title && <h2 id="parent-modal-title">{props.title}</h2>}
          {props.desc && <p id="modal-description">
            {props.desc}
          </p>}
          <br />
            <Button onClick={()=>props.setOpen(false)}>Cancel</Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
        </Button>
        </Box>
      </Modal>
    </div>
  );
}