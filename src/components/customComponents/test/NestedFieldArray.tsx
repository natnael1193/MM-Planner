import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { TextField } from '@mui/material';

const NestedFieldArray = ({ nestIndex, control, register, item, defaultValues }: any) => {
  const { fields, remove, append, } = useFieldArray({
    control,
    name: `test[${nestIndex}].nestedArray`,
  });

//   console.log(fields);

  return (
    <div>
      {item.map((item: any, k: any) => {
        return (
          <div key={item.field} style={{ marginLeft: 20 }}>
            <label>Nested Array:</label>
            <TextField
            //   name={`test[${nestIndex}].nestedArray[${k}].field`}
              // ref={register({ required: true })}
            //   {...register('nestedArray')}
            {...register(`test[${nestIndex}].nestedArray[${k}].field` as const)}
              defaultValue={item.field}
            />
          </div>
        );
      })}

      {/* <button
        type="button"
        onClick={() =>
          append({
            field1: 'field1',
            field2: 'field2',
          })
        }
      >
        Append Nested
      </button> */}
    </div>
  );
};

export default NestedFieldArray;
