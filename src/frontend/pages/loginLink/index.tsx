import React from 'react';




const loginLink = () => {

 const authByLoginLink: (authLoginLink: string) => Promise<{ token: string, refreshToken: string }>
= (authLoginLink: string) => Promise.resolve({ token: 'test', refreshToken: 'test' })

  return (
    <div>
      loginLink
    </div>
  );
};

export default loginLink;