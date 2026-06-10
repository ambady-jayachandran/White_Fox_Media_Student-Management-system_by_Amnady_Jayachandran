export const getErrorMessage = (error, fallback = "Something went wrong") => {
  const data = error?.response?.data;
  if (data?.message && typeof data.message === "string") {
    if (data.errors?.non_field_errors?.length) {
      return data.errors.non_field_errors[0];
    }
    if (Array.isArray(data.errors) && data.errors.length) {
      return data.errors[0];
    }
    return data.message;
  }
  if (typeof data?.detail === "string") {
    return data.detail;
  }
  return fallback;
};

export const getFieldErrors = (error) => error?.response?.data?.errors || {};
