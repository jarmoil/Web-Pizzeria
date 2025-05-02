import React from 'react';

const AddressInput = ({address, setAddress, disabled = false}) => (
  <div className="address-input">
    <label htmlFor="delivery-address">Delivery Address</label>
    <input
      type="text"
      id="delivery-address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      placeholder="Enter delivery address"
      disabled={disabled}
    />
  </div>
);

export default AddressInput;
