import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const errorSchema = yup.object({
  name: yup.string().required("User name is required"),
  email: yup
    .string()
    .email("Email Format is no validate")
    .required("Email is required"),
  channel: yup.string().required("Channel name is required"),
});

type FormValue = {
  name: string;
  email: string;
  channel: string;
};
export const YupIntegration = () => {
  const { register, control, formState, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      name: "",
      email: "",
      channel: "",
    },
    resolver: yupResolver(errorSchema),
  });

  const { errors } = formState;

  const onSubmit = (data: FormValue) => {
    console.log("form value", data);
  };

  return (
    <div className="flex w-2/5 relative  flex-col">
      <h1 className="text-center text-xl mb-10 font-semibold text-white">
        Yup Validation Form
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-2 py-4 bg-black/30  rounded-xl"
      >
        <div className="relative flex gap-y-2 flex-col">
          <label
            htmlFor="userName"
            className=" text-base font-medium text-gray-200"
          >
            Name
          </label>
          <input
            {...register("name")}
            id="userName"
            placeholder="user name"
            className="standard-inputbox"
          />
          <p className="text-red-500 text-base">{errors.name?.message}</p>
        </div>
        <div className="flex flex-col gap-y-2 relative">
          <label
            htmlFor="userEmail"
            className=" text-sm font-medium text-gray-200"
          >
            Email
          </label>
          <input
            {...register("email")}
            id="userEmail"
            placeholder="user email"
            className="standard-inputbox"
          />
          <p className="text-red-500 text-base">{errors.email?.message}</p>
        </div>

        <div className="flex flex-col gap-y-2 relative">
          <label
            htmlFor="userChannal"
            className=" text-base font-medium text-gray-200"
          >
            Channal
          </label>
          <input
            {...register("channel")}
            id="userChannal"
            placeholder="user channal"
            className="standard-inputbox"
          />
          <p className="text-red-500 text-base">{errors.channel?.message}</p>
        </div>

        <button
          type="submit"
          className=" px-6 py-2 w-40 mx-auto rounded-xl bg-white text-blue-500 mt-5 font-medium text-base"
        >
          Submit
        </button>
        <DevTool control={control} />
      </form>
    </div>
  );
};
