import FormInput from "../sub-components/FormInput";

const SubscribeModal = () => {
  const handleSubmit = () => {
    // do something
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="">Stay up to Date</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={""}
          inputAttributes={{
            placeholder: "Name",
            type: "text",
            required: false,
          }}
        />
        <FormInput
          label={""}
          inputAttributes={{
            placeholder: "Email",
            type: "email",
            required: false,
          }}
        />
      </form>
    </div>
  );
};

export default SubscribeModal;
