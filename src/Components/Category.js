import { Badge, Row, Col } from "react-bootstrap"
import { AiOutlineClose } from 'react-icons/ai'


const Category = ({ name, handleCategoryDelete }) => {


  return (
    <h4>
      <Badge className="mr-2" variant="success">
        <Row>
          <Col className="pr-1 mb-1 text-right">
            <AiOutlineClose size={20} className="pointer" onClick={handleCategoryDelete} />
          </Col>                    
        </Row>
        <Row>
          <Col>
          {name}
          </Col>
        </Row>
      </Badge>
    </h4>
    
  )
}

export default Category