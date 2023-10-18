import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { useRoqClient } from 'lib/roq';
import * as RoqTypes from 'lib/roq/types';

import { prescriptionValidationSchema } from 'validationSchema/prescriptions';
import { UserInterface } from 'interfaces/user';
import { PrescriptionInterface } from 'interfaces/prescription';

function PrescriptionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const roqClient = useRoqClient();
  const handleSubmit = async (values: PrescriptionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await roqClient.prescription.create({ data: values as RoqTypes.prescription });
      resetForm();
      router.push('/prescriptions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PrescriptionInterface>({
    initialValues: {
      doctor_name: '',
      medication: '',
      dosage: '',
      duration: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: prescriptionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Prescriptions',
              link: '/prescriptions',
            },
            {
              label: 'Create Prescription',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Prescription
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.doctor_name}
            label={'Doctor Name'}
            props={{
              name: 'doctor_name',
              placeholder: 'Doctor Name',
              value: formik.values?.doctor_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.medication}
            label={'Medication'}
            props={{
              name: 'medication',
              placeholder: 'Medication',
              value: formik.values?.medication,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.dosage}
            label={'Dosage'}
            props={{
              name: 'dosage',
              placeholder: 'Dosage',
              value: formik.values?.dosage,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.duration}
            label={'Duration'}
            props={{
              name: 'duration',
              placeholder: 'Duration',
              value: formik.values?.duration,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={() => roqClient.user.findManyWithCount({})}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/prescriptions')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'prescription',
    operation: AccessOperationEnum.CREATE,
  }),
)(PrescriptionCreatePage);
