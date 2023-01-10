export type ToastType = "WARNING" | "SUCCESS" | "ALERT";

const toastAlerts = {
  WARNING: {
    css: "alert alert-warning shadow-lg",
    message:
      "you have entered the incorrect email or password. Please try again",
  },
  SUCCESS: {
    css: "alert alert-success shadow-lg",
    message: "Messafe sent successfully.",
  },
  ALERT: { css: "alert shadow-lg", message: "Thanks!" },
};

const Toast = ({ toast }: { toast: ToastType }) => {
  const { css, message } = toastAlerts[toast];

  return (
    <div className="toast toast-start">
      <div className={css}>
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
