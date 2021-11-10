import { useForm } from "@hooks";
import { Spinner } from "@components/base/index";
import { usePostContext } from "@contexts/PostProvider";
const PostAddForm = () => {
  const { onAddpost } = usePostContext();
  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      userId: 1,
      title: "",
      body: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      await onAddpost(values);
    },
    validate: ({ title, body }) => {
      const errors = {};
      if (!title) errors.title = "제목을 입력해주세요.";
      if (!body) errors.body = "내용을 입력해주세요.";
      return errors;
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" name="title" onChange={handleChange} />
        {errors.title}
      </div>
      <div>
        <input type="text" name="body" onChange={handleChange} />
        {errors.body}
      </div>
      {isLoading ? <Spinner></Spinner> : <button type="submit">ADD</button>}
    </form>
  );
};
export default PostAddForm;
