import { Alert } from "react-bootstrap"

const Message = ({ variant, children}) => {
  return (
    <Alert variant={variant}>
      <p className="mb-0">{children}</p>
    </Alert>
  )
}


export default Message