import Alert from "react-bootstrap/Alert";

interface Props {
  message?: string;
  variant?: string;
}

function AlertBanner({ message, variant }: Props) {
  const alertMessage =
    message || "An unexpected error ocurred. Please try again later.";
  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
}

export default AlertBanner;
