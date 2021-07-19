import { Badge } from "react-bootstrap"


const Category = ({name}) => {

  return (
    <h4>
      <Badge className="mr-2" pill variant="success">
        {name}
      </Badge>
    </h4>
    
  )
}

export default Category