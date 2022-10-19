import React from 'react';
import { useForm } from 'react-hook-form';
import FieldArrayComponet from 'src/components/customComponents/test/FieldArrayComponet';

const defaultValues: any = {
  test: [
    {
      name: 'useFieldArray1',
      nestedArray: [{ field: 'field1' }, { field: 'field2' }],
    },
    {
      name: 'useFieldArray2',
      nestedArray: [{ field: 'field1' }, { field: 'field2' }],
    },
    {
      name: 'useFieldArray 3',
      nestedArray: [{ field: 'field4' }, { field: 'field5' }, { field: 'field6' }],
    },
  ],
};

const FieldArray = () => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues,
  });
  const onSubmit = (data: any) => {
    console.log('data', data.test);
    const newData = data.test.map(function (test: any) {
      return {
        name: test.name,
        nested:  test.nestedArray.filter((element: any) => {
            return element.field !== '';
        }),
      };
    });

    console.log(newData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Array of Array Fields</h1>
        <p>The following example demonstrate the ability of building nested array fields.</p>

        <FieldArrayComponet
          {...{ control, register, defaultValues, getValues, setValue, errors }}
          defaultValues={defaultValues}
        />

        <button type="button" onClick={() => reset(defaultValues)}>
          Reset
        </button>

        <input type="submit" />
      </form>
    </div>
  );
};

export default FieldArray;
