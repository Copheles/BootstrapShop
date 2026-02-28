import { Alert } from "react-bootstrap"

const Message = ({ variant, children}) => {
  return (
    <Alert variant={variant} className="mt-2">
      <p className="mb-0">{children}</p>
    </Alert>
  )
}


export default Message