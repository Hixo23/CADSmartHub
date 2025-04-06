// frontend/src/components/SwaggerDocs.js

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerDocs = () => {
    return (
      <div style={{ height: '100vh' }}>
        <SwaggerUI url="http://localhost:5000/api-docs/swagger.json" />
      </div>
    );
  };

export default SwaggerDocs;
