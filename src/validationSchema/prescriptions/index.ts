import * as yup from 'yup';

export const prescriptionValidationSchema = yup.object().shape({
  doctor_name: yup.string().required(),
  medication: yup.string().required(),
  dosage: yup.string().required(),
  duration: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
