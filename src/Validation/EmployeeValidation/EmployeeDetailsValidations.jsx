import * as Yup from 'yup';

const FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'application/pdf'];

const EmpDetailsSchema = Yup.object().shape({
  Designation: Yup.string().required('Designation is required'),
  Department: Yup.string().required('Department is required'),
  Address: Yup.string().required('Address is required'),
  salary: Yup.number().required('Salary is required').min(0, 'Salary must be positive'),

  // File validations
  aadhaar: Yup.mixed()
    .required('Aadhaar file is required')
    .test('fileSize', 'File too large', value => !value || value.size <= FILE_SIZE)
    .test('fileType', 'Unsupported file format', value => !value || SUPPORTED_FORMATS.includes(value.type)),

  pancard: Yup.mixed()
    .required('PAN card is required')
    .test('fileSize', 'File too large', value => !value || value.size <= FILE_SIZE)
    .test('fileType', 'Unsupported file format', value => !value || SUPPORTED_FORMATS.includes(value.type)),

  Driving_Licance: Yup.mixed()
    .required('Driving license is required')
    .test('fileSize', 'File too large', value => !value || value.size <= FILE_SIZE)
    .test('fileType', 'Unsupported file format', value => !value || SUPPORTED_FORMATS.includes(value.type)),

  Voter_Id: Yup.mixed()
    .required('Voter ID is required')
    .test('fileSize', 'File too large', value => !value || value.size <= FILE_SIZE)
    .test('fileType', 'Unsupported file format', value => !value || SUPPORTED_FORMATS.includes(value.type)),

  Bank_Proof: Yup.mixed()
    .required('Bank proof is required')
    .test('fileSize', 'File too large', value => !value || value.size <= FILE_SIZE)
    .test('fileType', 'Unsupported file format', value => !value || SUPPORTED_FORMATS.includes(value.type)),

  UAN_number: Yup.string()
    .matches(/^\d+$/, 'UAN must be numeric')
    .required('UAN number is required'),

  Back_Name: Yup.string().required('Bank name is required'),
  Bank_Account: Yup.string().required('Bank account number is required'),
  IFSC_Code: Yup.string().required('IFSC code is required')
});

export default EmpDetailsSchema;
