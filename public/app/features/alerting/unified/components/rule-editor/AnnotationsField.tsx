import React, { FC, useCallback } from 'react';
import { Button, Field, FieldArray, InputControl, Label, TextArea, useStyles } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';
import { css, cx } from '@emotion/css';
import { useFormContext } from 'react-hook-form';
import { RuleFormValues } from '../../types/rule-form';
import { AnnotationKeyInput } from './AnnotationKeyInput';

const AnnotationsField: FC = () => {
  const styles = useStyles(getStyles);
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const annotations = watch('annotations') as RuleFormValues['annotations'];

  const existingKeys = useCallback(
    (index: number): string[] => annotations.filter((_, idx: number) => idx !== index).map(({ key }) => key),
    [annotations]
  );

  return (
    <>
      <Label>Summary and annotations</Label>
      <FieldArray name={'annotations'} control={control}>
        {({ fields, append, remove }) => {
          return (
            <div className={styles.flexColumn}>
              {fields.map((field, index) => (
                <div key={field.id} className={styles.flexRow}>
                  <Field
                    className={styles.field}
                    invalid={!!errors.annotations?.[index]?.key?.message}
                    error={errors.annotations?.[index]?.key?.message}
                  >
                    <InputControl
                      name={`annotations[${index}].key`}
                      render={({ field: { ref, ...field } }) => (
                        <AnnotationKeyInput {...field} existingKeys={existingKeys(index)} width={18} />
                      )}
                      control={control}
                      rules={{ required: { value: !!annotations[index]?.value, message: 'Required.' } }}
                    />
                  </Field>
                  <Field
                    className={cx(styles.flexRowItemMargin, styles.field)}
                    invalid={!!errors.annotations?.[index]?.value?.message}
                    error={errors.annotations?.[index]?.value?.message}
                  >
                    <TextArea
                      className={styles.annotationTextArea}
                      {...register(`annotations[${index}].value`, {
                        required: { value: !!annotations[index]?.key, message: 'Required.' },
                      })}
                      placeholder={`value`}
                      defaultValue={field.value}
                    />
                  </Field>
                  <Button
                    type="button"
                    className={styles.flexRowItemMargin}
                    aria-label="delete annotation"
                    icon="trash-alt"
                    variant="secondary"
                    onClick={() => remove(index)}
                  />
                </div>
              ))}
              <Button
                className={styles.addAnnotationsButton}
                icon="plus-circle"
                type="button"
                variant="secondary"
                onClick={() => {
                  append({});
                }}
              >
                Add info
              </Button>
            </div>
          );
        }}
      </FieldArray>
    </>
  );
};

const getStyles = (theme: GrafanaTheme) => ({
  annotationTextArea: css`
    width: 426px;
    height: 76px;
  `,
  addAnnotationsButton: css`
    flex-grow: 0;
    align-self: flex-start;
    margin-left: 124px;
  `,
  flexColumn: css`
    display: flex;
    flex-direction: column;
  `,
  field: css`
    margin-bottom: ${theme.spacing.xs};
  `,
  flexRow: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  `,
  flexRowItemMargin: css`
    margin-left: ${theme.spacing.xs};
  `,
});

export default AnnotationsField;
