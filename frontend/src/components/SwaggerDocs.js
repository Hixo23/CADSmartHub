// frontend/src/components/SwaggerDocs.js

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerDocs = () => {
    return (
      <div className="p-3 bg-white" style={{ minHeight: "calc(100vh - 150px)" }}>
        <SwaggerUI url="http://localhost:5000/api-docs/swagger.json" />
      </div>
    );
  };

export default SwaggerDocs;
