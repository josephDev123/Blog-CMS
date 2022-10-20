import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function ActiveLink({href, children, ...props}) {

  const resolve = useResolvedPath(href);
  const match = useMatch({path:resolve.pathname, end:true});

  return (
      <div>
        <Link to={href} {...props} style={{ fontWeight:match?"bolder":'' }}>
          {children} 
         </Link>
      </div>
  )
}

