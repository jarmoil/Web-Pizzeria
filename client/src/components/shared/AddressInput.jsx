import React from 'react';

/**
 * AddressInput component for entering a delivery address.
 * Provides a text input field for users to input their delivery address.
 *
 * @param {Object} props - Component props.
 * @param {string} props.address - The current value of the delivery address.
 * @param {Function} props.setAddress - Function to update the delivery address.
 * @param {boolean} [props.disabled=false] - Whether the input field is disabled.
 * @returns {JSX.Element} The address input field.
 */
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
