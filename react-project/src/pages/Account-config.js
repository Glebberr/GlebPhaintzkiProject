export const structure = [
    { name: 'middleName', type: 'text', label: 'Middle name', required: false, halfWidth: true },
    { name: 'lastName', type: 'text', label: 'Last name', required: true, halfWidth: true },
    { name: 'phone', type: 'tel', label: 'Phone', required: true, halfWidth: true },
    { name: 'email', type: 'email', label: 'Email', required: true, halfWidth: true },
    { name: 'imgAlt', type: 'text', label: 'Image alt', required: false, halfWidth: true },
    { name: 'imgUrl', type: 'text', label: 'Image url', required: false, halfWidth: false },
    { name: 'state', type: 'text', label: 'State', required: false, halfWidth: true },
    { name: 'country', type: 'text', label: 'Country', required: true, halfWidth: true },
    { name: 'city', type: 'text', label: 'City', required: true, halfWidth: true },
    { name: 'street', type: 'text', label: 'Street', required: true, halfWidth: true },
    { name: 'houseNumber', type: 'number', label: 'House number', required: true, halfWidth: true },
    { name: 'zip', type: 'number', label: 'Zip', required: false, halfWidth: true },
]