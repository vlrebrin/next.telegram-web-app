
import { useForm, useFormState } from "react-hook-form"
import {
  Card, CardHeader, CardBody, Table, TableHeader,
  TableBody, TableColumn, TableRow, TableCell,
  Spacer, Button, Tooltip, Input, Textarea
} from "@nextui-org/react";

 //import { ErrorMessage } from '@hookform/error-message';

export default function Form() {
  
  // const isInvalid = React.useMemo(() => {
  //   if (value === "") return false;

  //   return validateEmail(value) ? false : true;
  // }, [value]);
  const lastCounter='1000'

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "all"   // onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'
})
  
 

  const onSubmit = (data) => console.log(data)
  console.log(watch("example")) // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Spacer y={4}/>
      <Card>
        <CardHeader>
          Текущие значения
        </CardHeader>
        <CardBody className="flex">
          
          {/* <Spacer y={4} /> */}
            <Input {...register("counter",
            {
              required: {
                value: true,
                message: "Значение счетчик не может быть пустым"
              },
              min: {
                value:  lastCounter,
                message: "Текущее значение не может быть меньше предыдущего"
              },
              max: {
                value: 99999,
                message:" Значение не может быть больше 99999"
              }

            })}
            //defaultValue={lastCounter}
            color={errors.counter ? "danger" : "default"}
            errorMessage={errors.counter ? errors.counter.message : ""}

            variant="faded" label="Счетчик" type="number" size="lg"
            step="0"
            labelPlacement={"inside"}
            endContent={"кВт·час"}
          />
          
          <Spacer y={4} />
          <Input {...register("summa",
            {
              required: {
                value: true,
                message: "Значение сумма не может быть пустым"
              },
              max: {
                value: 5000,
                message: "Значение не может превышать 5000"
              },
              min: {
                value: 10,
                message: "Значение должно быть более 10"
              },
            })}
            //defaultValue={3250}
            color={errors.summa ? "danger" : "default"}
            errorMessage={errors.summa ? errors.summa.message : ""}
            
            label=" Сумма " variant="faded" type="number" size="lg"
            step={0.01}
            labelPlacement={"inside"}
            endContent={"руб."}
          />

          <Spacer y={4} />
          <div className="flex flex-row items-center gap-4">
            <Textarea
              label="Потребление"
              labelPlacement="inside"
              //placeholder="Enter your description"
              minRows={1}
              isReadOnly
              defaultValue='23451 кВт.час'
              variant="faded"
              className="max-w-xs"
          ></Textarea>

            <Button clasName="mx-12"
              type="submit" color="primary"
              fullWidth isDisabled={!isValid}
            >
            Передать
            </Button>
          </div>
        </CardBody>
      </Card>
    </form>
  )
}