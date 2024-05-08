import { Formik, Form, Field } from "formik";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchForm.module.css";

export default function SearchForm({ onSearch }) {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => {
        if (values.query.trim() === "") {
          toast.error("This field should be filled");
          return;
        }
        onSearch(values.query);
        actions.resetForm();
      }}
    >
      <Form className={css.search}>
        <Field name="query" type="text" autoComplete="off" autoFocus />
        <button type="submit">Search</button>
        <Toaster position="top-center" reverseOrder={false} />
      </Form>
    </Formik>
  );
}
