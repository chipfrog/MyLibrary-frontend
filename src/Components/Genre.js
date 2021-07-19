import { Badge } from "react-bootstrap"


const Genre = ({name}) => {

  return (
    <Badge className="mr-2" variant="success">
      {name}
    </Badge>
    
  )
}

export default Genre