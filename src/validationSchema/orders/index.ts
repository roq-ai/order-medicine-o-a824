import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  total_price: yup.number().integer().required(),
  status: yup.string().required(),
  user_id: yup.string().nullable().required(),
  pharmacy_id: yup.string().nullable().required(),
});
