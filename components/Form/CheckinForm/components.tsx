/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseFormRegister, FieldValues, UseFormWatch } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { Group, Input, Select, Radio, Checkbox } from '../components';
import ExternalLink from '@/components/ExternalLink';
import { inperson, MLH, states } from './options';

interface Props {
  register: UseFormRegister<FieldValues>;
  errors: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
  };
  setFileUploaded?: (arg0: boolean) => void;
  watch: UseFormWatch<FieldValues>;
}

export function Confirmation({ register, errors, watch }: Props) {
  const { data: session } = useSession();
  const inperson_confirmation = watch('inperson');
  const lives_in_US = watch('lives_in_US');

  return (
    <>
      <Group title="Confirm Details">
        <Checkbox
          label="Are you aware that this is a completely in-person event?"
          variable="inperson_conf"
          options={[
            'Yes, I am aware that this is a completely in-person event.'
          ]}
          register={register}
          errors={errors}
          required
        />
        <Checkbox
          label="Do we have your permission to take pictures that may include you?"
          subtext={
            <p className="text-slate-300 mb-4">
              These photos will be posted on our Instagram and other social
              media. If you have a problem with this, please contact us at{' '}
              <ExternalLink
                name="citrushack@gmail.com"
                link="mailto:citrushack@gmail.com"
              />
              .
            </p>
          }
          variable="photo_consent"
          options={[
            'Yes, I give you permission to take pictures that may include me.'
          ]}
          register={register}
          errors={errors}
          required
        />
        <Checkbox
          label="Have you read the MLH Code of Conduct?"
          variable="MLH_code_of_conduct"
          options={MLH[0]}
          register={register}
          errors={errors}
          required
        />
        <Radio
          label="Do you live in the U.S.?"
          subtext={
            <p className="text-slate-300 mb-4">
              This is used only for shipping purposes. We will only be able to
              ship merchandise and/or prizes those who live within the U.S.
            </p>
          }
          variable="lives_in_US"
          options={['Yes', 'No']}
          register={register}
          errors={errors}
          required
        />
      </Group>
      {lives_in_US === 'Yes' && (
        <Group title="Address">
          <p className="text-slate-300 mb-4">
            Please input the best address to ship merchandise and/or prizes to
            you.
          </p>
          <Input
            type="text"
            label="Street Address"
            variable="address_line_1"
            register={register}
            errors={errors}
            required
          />
          <Input
            type="text"
            label="Apartment, Suite, etc."
            variable="address_line_2"
            register={register}
            errors={errors}
          />
          <div className="grid sm:grid-cols-7 gap-3">
            <span className="md:col-span-3">
              <Input
                type="text"
                label="City"
                variable="city"
                register={register}
                errors={errors}
                required
              />
            </span>
            <span className="md:col-span-2">
              <Select
                label="State"
                variable="state"
                register={register}
                errors={errors}
                options={states}
                required
              />
            </span>
            <span className="md:col-span-2">
              <Input
                type="text"
                label="Zip/Postal Code"
                variable="zipcode"
                register={register}
                errors={errors}
                required
              />
            </span>
          </div>
        </Group>
      )}
      {lives_in_US === 'No' && (
        <Group title="Address">
          <Input
            type="text"
            label="Name of Country"
            variable="foreign_country"
            register={register}
            errors={errors}
            required
          />
        </Group>
      )}
    </>
  );
}
