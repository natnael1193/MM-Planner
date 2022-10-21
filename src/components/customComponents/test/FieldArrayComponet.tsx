import { Button, TextField } from '@mui/material';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import NestedFieldArray from './NestedFieldArray';

const FieldArrayComponet = ({ control, register, defaultValues }: any) => {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: 'test',
  });

  //   renderCount++;

  let newData = [];

  newData = defaultValues.test.map(function (value: any) {
    return value.nestedArray;
  });


  return (
    <>
      <ul>
        {fields.map((item: any, index) => {
          return (
            <li key={item.id}>
              <TextField
                // name={`test[${index}].name`}
                // ref={register()}
                {...register(`test[${index}].name` as const)}
                defaultValue={item.name}
              />

              <Button type="button" onClick={() => remove(index)}>
                Delete
              </Button>
              <NestedFieldArray
                nestIndex={index}
                {...{ control, register }}
                item={item.nestedArray}
                defaultValues={defaultValues}
              />

              {/* fields.nestedArray */}
              {/* {item.nestedArray.map((item, index) => {
                    return (
                      <li key={item.id}>
                        <input
                          name={`test[${index}].name`}
                          ref={register()}
                          defaultValue={item.name}
                        />
                        <button type="button" onClick={() => remove(index)}>
                          Delete
                        </button>
                      </li>
                    );
                  })} */}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default FieldArrayComponet;
