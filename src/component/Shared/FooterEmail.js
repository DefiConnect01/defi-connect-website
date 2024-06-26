import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { AiOutlineArrowRight } from 'react-icons/ai';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const FooterEmail = () => {
  const [formdata, setFormData] = useState({
    email: ''
  });

  const { email } = formdata;

  const changeData = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const notify = (mes) => toast(mes);

  const submitData = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };

      const response = await axios.post(
        'https://folly-email-n8te.vercel.app/newsletter',
        { email },
        config
      );

      if (response.status === 200) {
        setFormData({
          email: ''
        });
        notify(response.data.message);
        console.log('Data submitted successfully');
      } else {
        console.error('Failed to submit data');
        notify('Failed to submit data. Please try again.'); 
      }
    } catch (error) {
      console.error('Error:', error);
      notify(`Error: Enter a valid email`);

      // if (error.response) {
      //   notify(`Error: ${error.response.data.message}`);
      // } else if (error.request) {
      //   notify('No response received from the server. Please try again.');
      // } else {
      //   notify('An unexpected error occurred. Please try again.');
      // }
    }
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Recipient's email"
        aria-label="Recipient's email"
        aria-describedby="basic-addon2"
        onChange={changeData}
        value={email}
        name="email"
        type='email'
      />
      <Button
        variant="outline-secondary"
        className="bg-primary"
        id="button-addon2"
        onClick={submitData}
      >
        <AiOutlineArrowRight style={{ color: 'white' }} />
      </Button>
    </InputGroup>
  );
};

export default FooterEmail;
