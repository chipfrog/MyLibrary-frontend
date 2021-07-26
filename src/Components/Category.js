import { Badge, Row, Col } from "react-bootstrap"
import { AiOutlineClose } from 'react-icons/ai'


const Category = ({ name, handleCategoryDelete, owned }) => {

  return (
    <h4>
      <Badge pill className="mr-2" variant="light">
        {owned
          ?
          <Row>
            <Col>
              {name}  
            </Col>
            <Col className="pr-1 mb-1 text-right">
              <AiOutlineClose size={20} className="pointer" onClick={handleCategoryDelete} />
            </Col>                    
          </Row>
          :
          <Row>
            <Col>
              {name}
            </Col>
          </Row>
        }
      </Badge>
    </h4>
    
  )
}

export default Category