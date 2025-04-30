import React from 'react';

const AddressInput = ({address, setAddress}) => (
  <input
    type="text"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    placeholder="Enter delivery address"
  />
);

export default AddressInput;
