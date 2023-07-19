import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const { BlobServiceClient } = require('@azure/storage-blob');
// Make sure you define createNewUser function somewhere
const SasUrl = 'https://hassaninclstorage.blob.core.windows.net/leads?sp=w&st=2023-07-11T05:23:32Z&se=2023-09-23T13:23:32Z&spr=https&sv=2022-11-02&sr=c&sig=IVFntlOU6GV%2Bw9fdsiHZJF6h5VjRVsTFVMwSP78fxM4%3D';
const CreateUserForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  async function createNewUser(user1) {
    // console.log(user);
    console.info(`user: ${JSON.stringify(user1)}`);
    const blobServiceClient = new BlobServiceClient(SasUrl);
    const containerClient = blobServiceClient.getContainerClient('leads');
    const fileId = uuidv4().toString();
    const blockBlobClient = containerClient.getBlockBlobClient(fileId);
    const _res = await blockBlobClient.uploadData(JSON.stringify(user1));
    console.info(_res._response);
  }

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let isValid = true;
    // const errors = {};

    if (user.name.trim().length < 3) {
      isValid = false;
      errors.name = 'Name should be at least 3 characters long.';
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      isValid = false;
      errors.email = 'Email is not valid.';
    }

    // Phone validation regex for a simple 10-digit phone number
    const phoneRegex = /^[2-9]{2}[0-9]{8}$/;
    if (!phoneRegex.test(user.phone)) {
      isValid = false;
      errors.phone = 'Phone number is not valid.';
    }

    setErrors(errors);

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      createNewUser(user);
      setIsSubmitted(true);
    }
  };

  return (
    <div>
      {isSubmitted ? (
        <div>Thank you, we will be contacting you soon.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <div className="error">{errors.name}</div>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <div className="error">{errors.email}</div>
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            placeholder="Phone"
          />
          <div className="error">{errors.phone}</div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default CreateUserForm;
