import { FieldProps } from "formik";
import Select from "react-select";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options: Array<Option>;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
}

export const GenreSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
}: CustomSelectProps) => {
  const onChange = (option: any) => {
    const data = isMulti
      ? (option as Option[]).map((item: Option) => item.value)
      : (option as Option).value;
    form.setFieldValue(field.name, data);
  };

  const getValue = () => {
    if (options) {
      return options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  );
};

export default GenreSelect;
